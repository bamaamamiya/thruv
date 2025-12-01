import React, { useState, useRef } from "react";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { cleanAddress } from "../utils/addressCleaner";
import { validateAddress } from "../utils/addressValidator";
import { matchAddress } from "../utils/addressMatcher";
import { calculateOngkir } from "../utils/calculateOngkir";

const FunnelPurchaseAllInOne = ({
  pixel,
  product,
  price,
  costProduct,
  adminWA = "6282387881505",
  discountTransfer,
  buttonColor = "bg-redto",
  buttonHoverColor = "hover:bg-red-700",
}) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  // === Helper ===
  const cleanAndValidateWA = (wa) => {
    let cleaned = wa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
    return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
  };

  // === Save Abandoned Lead with Merge ===
  const saveAbandonedLead = (nameInput, waInput, addressInput) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!nameInput || nameInput.length < 3) return;
      const cleanedWA = cleanAndValidateWA(waInput);
      if (!cleanedWA || !product) return;

      const docId = `${cleanedWA}_${product.title || "unknown"}`;
      const docRef = doc(db, "abandonedLeads", docId);

      try {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          // update existing doc
          await setDoc(
            docRef,
            {
              name: nameInput,
              whatsapp: cleanedWA,
              address: addressInput || "",
              updatedAt: Timestamp.now(),
            },
            { merge: true }
          );
        } else {
          // create new doc
          await setDoc(docRef, {
            name: nameInput,
            whatsapp: cleanedWA,
            address: addressInput || "",
            productTitle: product.title,
            status: "abandoned",
            createdAt: Timestamp.now(),
          });
        }
        console.log("Abandoned lead saved:", cleanedWA);
      } catch (err) {
        console.error("Gagal simpan abandoned lead:", err);
      }
    }, 1500); // debounce 1.5s
  };

  const sendOrderEmail = async (data) => {
    try {
      const res = await fetch(
        "https://order-alert-six.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            whatsapp: data.whatsapp,
            address: data.address,
            product_title: data.productTitle,
            price: data.price,
            total: data.total,
            payment_method: data.paymentMethod,
            order_date: data.order_date,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Gagal kirim email");
      }

      console.log("Email order berhasil dikirim!");
    } catch (err) {
      console.error("Error kirim email:", err);
    }
  };

  // === Handle Submit Pesanan ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (!name || !whatsapp || !address) {
      alert("Silakan isi semua data dengan lengkap!");
      setLoading(false);
      return;
    }

    const cleanedWA = cleanAndValidateWA(whatsapp);
    if (!cleanedWA) {
      alert("Nomor WhatsApp tidak valid. Harus dimulai dengan 08 atau 62.");
      setLoading(false);
      return;
    }

    const safeProductTitle = product?.title
      ? product.title.replace(/\s+/g, "-").toLowerCase()
      : "default";

    const orderId = `${cleanedWA}_${safeProductTitle}_${Date.now()}`;

    try {
      // ✅ Lazy Import modul berat di sini
      const { setDoc, doc, Timestamp, getDoc } = await import(
        "firebase/firestore"
      );
      const { db } = await import("../firebase");
      const { cleanAddress } = await import("../utils/addressCleaner");
      const { validateAddress } = await import("../utils/addressValidator");
      const { matchAddress } = await import("../utils/addressMatcher");
      const { calculateOngkir } = await import("../utils/calculateOngkir");

      const addressCleaned = cleanAddress(address);

      // Validation & matching
      const validation = validateAddress(addressCleaned);
      if (!validation.valid) {
        alert(
          validation.reason === "Alamat terlalu singkat"
            ? "Alamat terlalu singkat 🙏. Mohon sertakan jalan, nomor rumah, dan kecamatan."
            : validation.reason
        );
        setLoading(false);
        return;
      }

      const matched = await matchAddress(addressCleaned);
      const ongkir = calculateOngkir(matched.province?.name);
      const needsReviewFlag = validation.needsReview || !matched.success;
      const totalPrice = price + ongkir;

      // Save order
      await setDoc(doc(db, "leads", orderId), {
        name,
        whatsapp: cleanedWA,
        addressClean: addressCleaned,
        price,
        costProduct: product.costProduct || 0,
        ongkir,
        paymentMethod,
        productTitle: product.title,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: "pending",
        resiCheck: "not",
        confirmation: "belum",
        customerConfirmed: false,
        rts: 0,
        needsReview: needsReviewFlag,
        province: matched.province?.name || "",
        regency: matched.regency?.name || "",
        district: matched.district?.name || "",
        village: matched.village?.name || "",
      });

      // FB Pixel
      if (window.fbq) {
        try {
          fbq("trackSingle", pixel, "Purchase", {
            content_name: product.title,
            content_ids: [product.title || "123"],
            content_type: "product",
            value: price || 0,
            currency: "IDR",
          });
        } catch (err) {
          console.error("FB Pixel Error:", err);
        }
      }

      await sendOrderEmail({
        name,
        whatsapp: cleanedWA,
        address,
        productTitle: product.title,
        productId: product.title || "unknown",
        price,
        total: totalPrice,
        paymentMethod,
        order_date: new Date().toLocaleString("id-ID"),
      });

      // Kirim WA ke admin
      const message =
        `PESANAN BARU\n\n` +
        `Produk: ${product.title}\n` +
        `Nama: ${name}\n` +
        `Metode Pembayaran: ${paymentMethod}\n\n` +
        `Mohon segera diproses, terima kasih`;
      // === Redirect Aman ke WhatsApp (Kompatibel FB/IG Browser) ===
      const whatsappURL = `https://api.whatsapp.com/send?phone=${adminWA}&text=${encodeURIComponent(
        message
      )}`;

      try {
        // Redirect normal
        window.location.href = whatsappURL;
      } catch (err) {
        console.error("Redirect gagal, mencoba fallback...", err);

        // Fallback (FB/IG kadang blokir redirect pertama)
        setTimeout(() => {
          window.location.href = whatsappURL;
        }, 400);
      }

      // Reset form
      setName("");
      setWhatsapp("");
      setAddress("");
      setPaymentMethod("COD");
    } catch (err) {
      console.error("Gagal simpan ke Firestore:", err);
      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Data Penerima:</h2>

      <form onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              saveAbandonedLead(e.target.value, whatsapp, address);
            }}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
          />
        </div>

        {/* WhatsApp */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Masukkan No. WhatsApp Aktif"
            value={whatsapp}
            onChange={(e) => {
              const wa = e.target.value.replace(/\D/g, "");
              setWhatsapp(wa);
              saveAbandonedLead(name, wa, address);
            }}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Alamat */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Alamat Lengkap :</label>
          <textarea
            placeholder="Masukkan Nomor Rumah, RT/RW, Kecamatan, Kota/Kab, Ciri2 Rumah"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              saveAbandonedLead(name, whatsapp, e.target.value);
            }}
            rows={4}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring resize-none"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          {["COD", "Bank Transfer"].map((method) => (
            <div
              key={method}
              className="flex items-center cursor-pointer border-2 p-4 rounded-md mb-2"
              onClick={() => setPaymentMethod(method)}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="mr-2"
              />
              <label className="grid items-center relative cursor-pointer">
                <img
                  src={`/images/funnel/${
                    method === "COD" ? "cod" : "transfer"
                  }.webp`}
                  alt={method}
                  className="w-12 h-12 object-contain"
                />
                <span className="font-medium -mt-2">
                  {method === "COD" ? "Bayar di Tempat" : "Bank Transfer"}
                </span>
                {method === "Bank Transfer" && discountTransfer && (
                  <span className="inline-block bg-redto/10 text-redto text-[11px] font-bold px-3 py-[2px] rounded-md shadow-sm border border-redto/70 capitalize tracking-wide">
                    Potongan ONGKIR 10RB !!!
                  </span>
                )}
              </label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-2xl ${buttonColor} text-white font-bold py-2 px-4 rounded-lg transition capitalize ${
            loading ? "opacity-50 cursor-not-allowed" : buttonHoverColor
          }`}
        >
          {/* {loading ? "Memproses..." : "Ambil Promo & Lanjut Ke WA ADMIN"} */}
          {loading ? "Memproses..." : "Ambil Promo di WhatsApp"}
        </button>
      </form>
    </div>
  );
};

export default FunnelPurchaseAllInOne;
