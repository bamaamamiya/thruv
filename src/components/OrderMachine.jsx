import React, { useState, useRef } from "react";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { sha256 } from "../utils/hash";
import { cleanAddress } from "../utils/addressCleaner";
import { validateAddress } from "../utils/addressValidator";
import { matchAddress } from "../utils/addressMatcher";
import { calculateOngkir } from "../utils/calculateOngkir";
import { detectProvinceFast } from "../utils/detectProvinceFast";
import ProductBundles from "./product/ProductBundles";

const OrderMachine = ({
  pixel,
  product,
  adminWA = "6282387881505",
  discountTransfer,
  buttonColor = "bg-redto",
  buttonHoverColor = "hover:bg-red-700",
  useOngkir = true,
}) => {
  console.log("========== ORDER MACHINE ==========");
  console.log("Pixel:", pixel);

  if (!product) {
    return <div>Loading...</div>;
  }

  const settings = React.useMemo(
    () => ({
      checkout: {
        cod: true,
        bankTransfer: true,
        ongkir: true,
        bundle: true,
        ...(product?.settings?.checkout || {}),
      },

      automation: {
        aiAgent: false,
        reminder: false,
        faq: false,
        followUp: false,
        upsell: false,
        ...(product?.settings?.automation || {}),
      },
    }),
    [product],
  );

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    settings.checkout.cod ? "COD" : "Bank Transfer",
  );
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const [selectedBundle, setSelectedBundle] = useState(
    product?.bundles?.length ? product.bundles[0] : null,
  );

  // === Helper ===

  const paymentMethods = React.useMemo(() => {
    const methods = [];

    if (settings.checkout.cod) {
      methods.push("COD");
    }

    if (settings.checkout.bankTransfer) {
      methods.push("Bank Transfer");
    }

    return methods;
  }, [settings.checkout.cod, settings.checkout.bankTransfer]);

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
            { merge: true },
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
        },
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
      alert("Isi data lengkap!");
      setLoading(false);
      return;
    }

    const cleanedWA = cleanAndValidateWA(whatsapp);
    if (!cleanedWA) {
      alert("WA tidak valid");
      setLoading(false);
      return;
    }

    try {
      const addressCleaned = cleanAddress(address);
      const validation = validateAddress(addressCleaned);

      if (!validation.valid) {
        alert(validation.reason);
        setLoading(false);
        return;
      }

      // let matched = {};
      let needsReviewFlag = false;
      const provinceName = detectProvinceFast(addressCleaned);

      // if (useOngkir) {
      //   matched = await matchAddress(addressCleaned);

      //   // ❌ HARD REJECT jika provinsi tidak ditemukan
      //   if (!matched.province) {
      //     alert(
      //       "Mohon isi provinsi kakak 🙏\n\nContoh:\n- Jawa Timur / Jatim\n- DKI Jakarta / Jakarta\n- Bali\n- Jawa Barat / Jabar",
      //     );
      //     setLoading(false);
      //     return;
      //   }

      //   ongkir = calculateOngkir(matched.province.name);
      //   needsReviewFlag = validation.needsReview || !matched.success;
      // }

      if (settings.checkout.ongkir && !provinceName) {
        alert(
          "Mohon isi provinsi ya kak 🙏\n\nContoh:\n- Jakarta\n- Bandung\n- Surabaya",
        );
        setLoading(false);
        return;
      }
      let ongkir = 0;

      if (settings.checkout.ongkir) {
        ongkir = calculateOngkir(provinceName);
      }

      // 🔥 AMBIL DATA DARI PRODUCT DB
      const activePricing =
        settings.checkout.bundle && selectedBundle
          ? selectedBundle.pricing
          : product.pricing;

      const price = activePricing.price;
      const costProduct = activePricing.cost;
      const totalPrice = price + ongkir;

      const orderId = `${cleanedWA}_${product.id}_${Date.now()}`;

      await setDoc(doc(db, "leads", orderId), {
        // 👤 CUSTOMER
        name,
        whatsapp: cleanedWA,
        addressClean: addressCleaned,
        paymentMethod,

        // 📦 PRODUCT
        productId: product.id,
        productTitle: product.title,

        bundleId: settings.checkout.bundle ? selectedBundle?.id || null : null,
        bundleTitle: settings.checkout.bundle
          ? selectedBundle?.title || null
          : null,
        bundleQty: settings.checkout.bundle ? selectedBundle?.quantity || 1 : 1,
        bundleBadge: settings.checkout.bundle
          ? selectedBundle?.badge || ""
          : "",

        price,
        costProduct,

        // 💰 PRICING
        ongkir,
        total: totalPrice,

        // 📊 BUSINESS
        status: "pending",
        // human/order state
        state: "NEW",

        // ⚙️ SYSTEM
        queuedForMessage: false,
        // automation state

        aiStatus: settings.automation.aiAgent ? "QUEUED" : "SKIPPED",

        // automation metadata
        aiProcessingAt: null,
        aiLastSentAt: null,
        aiRetryCount: 0,
        // whatsapp

        chatId: null,
        // 🚚 LOGISTIC
        resiCheck: "not",
        rts: 0,

        // ⚠️ VALIDATION
        needsReview: settings.checkout.ongkir ? needsReviewFlag : false,

        // 📍 LOCATION
        // province: useOngkir ? matched.province?.name || "" : "",
        province: settings.checkout.ongkir ? provinceName : "",
        // 🕒 TIME
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      console.log("window.fbq =", window.fbq);
      console.log("Pixel prop =", pixel);
      console.log("Price =", price);
      console.log("WA =", cleanedWA);
      // FB Pixel
      if (window.fbq) {
        try {
          const hashedPhone = await sha256(cleanedWA);

          const pixelIds = Array.isArray(pixel) ? pixel : [pixel];

          pixelIds.forEach((id) => {
            console.log("Kirim Purchase ke pixel:", id);

            fbq("trackSingle", id, "Purchase", {
              content_name: product.title,
              content_ids: [product.title || "123"],
              content_type: "product",
              ph: hashedPhone,
              value: price || 0,
              currency: "IDR",
            });
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
        bundle: selectedBundle?.title || "Default",
        quantity: selectedBundle?.quantity || 1,
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
        message,
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
      setPaymentMethod(settings.checkout.cod ? "COD" : "Bank Transfer");
    } catch (err) {
      console.error("Gagal simpan ke Firestore:", err);
      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      {settings.checkout.bundle && product?.bundles?.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-3">Pilih Paket</h2>

          <ProductBundles
            bundles={product.bundles}
            selectedBundle={selectedBundle}
            setSelectedBundle={setSelectedBundle}
          />
        </div>
      )}

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
          {paymentMethods.map((method) => (
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
      <p className="text-center text-xs p-2 italic font-semibold text-gray-700">
        Mohon isi data hanya jika siap dihubungi hari ini & menerima pengiriman.
      </p>
    </div>
  );
};

export default OrderMachine;
