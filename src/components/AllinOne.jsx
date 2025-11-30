"use client";
import React, { useState, useRef } from "react";

const AllInOne = ({
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

  // === Clean & Validate WhatsApp ===
  const cleanAndValidateWA = (wa) => {
    let cleaned = wa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
    return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
  };

  // === Save Abandoned Lead (Debounce) ===
  const saveAbandonedLead = async (nameInput, waInput, addressInput) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        if (!nameInput || nameInput.length < 3) return;
        const cleanedWA = cleanAndValidateWA(waInput);
        if (!cleanedWA || !product) return;

        const { setDoc, doc, getDoc, Timestamp } = await import("firebase/firestore");
        const { db } = await import("../firebase");

        const docId = `${cleanedWA}_${product.title || "unknown"}`;
        const docRef = doc(db, "abandonedLeads", docId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
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
          await setDoc(docRef, {
            name: nameInput,
            whatsapp: cleanedWA,
            address: addressInput || "",
            productTitle: product.title,
            status: "abandoned",
            createdAt: Timestamp.now(),
          });
        }
        console.log("💾 Abandoned lead saved:", cleanedWA);
      } catch (err) {
        console.error("❌ Gagal simpan abandoned lead:", err);
      }
    }, 1500);
  };

  // === Send Order Email ===
  const sendOrderEmail = async (data) => {
    try {
      const res = await fetch("https://order-alert-six.vercel.app/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gagal kirim email");
      console.log("📧 Email order berhasil dikirim!");
    } catch (err) {
      console.error("❌ Error kirim email:", err);
    }
  };

  // === Handle Submit (WA-First Mode) ===
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

    const message =
      `*PESANAN BARU*\n\n` +
      `*Produk:* ${product.title}\n` +
      `*Nama:* ${name}\n` +
      `*No. WhatsApp:* ${cleanedWA}\n` +
      `*Alamat:* ${address}\n` +
      `*Metode Pembayaran:* ${paymentMethod}\n\n` +
      `Mohon segera diproses, terima kasih 🙏`;

    const whatsappURL = `https://wa.me/${adminWA}?text=${encodeURIComponent(message)}`;

    // === 1️⃣ Langsung buka WA dulu (user gesture context) ===
    const newTab = window.open(whatsappURL, "_blank");
    if (!newTab) console.warn("⚠️ Browser block popup WA");

    // === 2️⃣ Jalankan proses backend TANPA await (biar gak delay redirect) ===
    (async () => {
      try {
        // Lazy import modules
        const { setDoc, doc, Timestamp } = await import("firebase/firestore");
        const { db } = await import("../firebase");
        const { cleanAddress } = await import("../utils/addressCleaner");
        const { validateAddress } = await import("../utils/addressValidator");
        const { matchAddress } = await import("../utils/addressMatcher");
        const { calculateOngkir } = await import("../utils/calculateOngkir");

        const addressCleaned = cleanAddress(address);
        const validation = validateAddress(addressCleaned);
        const matched = await matchAddress(addressCleaned);
        const ongkir = calculateOngkir(matched.province?.name);
        const totalPrice = price + ongkir;

        // Firestore Save
        await setDoc(doc(db, "leads", orderId), {
          name,
          whatsapp: cleanedWA,
          address,
          addressClean: addressCleaned,
          price,
          costProduct: costProduct || 0,
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
          needsReview: validation.needsReview || !matched.success,
          province: matched.province?.name || "",
          regency: matched.regency?.name || "",
          district: matched.district?.name || "",
          village: matched.village?.name || "",
        });

        // Pixel tracking (no await)
        if (window.fbq) {
          fbq("trackSingle", pixel, "Purchase", {
            content_name: product.title,
            content_ids: [product.title || "123"],
            content_type: "product",
            value: price || 0,
            currency: "IDR",
          });
          fbq("flush");
          console.log("🎯 Pixel Purchase terkirim!");
        }

        // Send Email
        sendOrderEmail({
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

        console.log("✅ Backend task selesai di background!");
      } catch (err) {
        console.error("❌ Error backend task:", err);
      }
    })();

    // === 3️⃣ Reset form ===
    setTimeout(() => {
      setName("");
      setWhatsapp("");
      setAddress("");
      setPaymentMethod("COD");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
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

        {/* Payment */}
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
                  src={`/images/funnel/${method === "COD" ? "cod" : "transfer"}.webp`}
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

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-2xl ${buttonColor} text-white font-bold py-2 px-4 rounded-lg transition capitalize ${
            loading ? "opacity-50 cursor-not-allowed" : buttonHoverColor
          }`}
        >
          {loading ? "Memproses..." : "Ambil Promo di WhatsApp"}
        </button>
      </form>
    </div>
  );
};

export default AllInOne;
