import React, { useState, useRef } from "react";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { cleanAddress, needsReview } from "../utils/addressCleaner";
import { validateAddress } from "../utils/addressValidator";
import { matchAddress } from "../utils/addressMatcher";
import { calculateOngkir } from "../utils/calculateOngkir";

/**
 * FunnelPurchaseBundlesAllInOne
 * - Visual bundle selector kept from your FunnelPurchaseBundles
 * - All order handling logic taken from FunnelPurchaseAllInOne and adapted to use `bundle`
 */
const FunnelPurchaseBundlesAllInOne = ({
  pixel,
  bundles = [],
  discountTransfer = false,
  buttonColor = "bg-redto",
  buttonHoverColor = "hover:bg-red-700",
  adminWA = "6282387881505",
}) => {
  // form states
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [bundle, setBundle] = useState(bundles?.[0] || null);
  const [loading, setLoading] = useState(false);

  // debounce ref for abandoned lead
  const debounceRef = useRef(null);

  // === Helpers ===
  const cleanAndValidateWA = (wa) => {
    if (!wa) return null;
    let cleaned = wa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
    // allow 9-14 digits after 62 (same as AllInOne)
    return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
  };

  // Abandoned lead save (debounced + merge)
  const saveAbandonedLead = (nameInput, waInput, addressInput) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        if (!nameInput || nameInput.length < 3) return;
        const cleanedWA = cleanAndValidateWA(waInput);
        if (!cleanedWA || !bundle) return;

        const docId = `${cleanedWA}_${bundle.title || "unknown"}`;
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
            productTitle: bundle.title,
            status: "abandoned",
            createdAt: Timestamp.now(),
          });
        }
        console.log("Abandoned lead saved:", cleanedWA);
      } catch (err) {
        console.error("Failed saving abandoned lead:", err);
      }
    }, 1500); // 1.5s debounce
  };

  // === Submit handler ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // basic empty checks
      if (!name || !whatsapp || !address) {
        alert("Silakan isi semua data dengan lengkap!");
        setLoading(false);
        return;
      }
      if (!bundle) {
        alert("Produk (bundle) tidak ditemukan!");
        setLoading(false);
        return;
      }

      // clean WA
      const cleanedWA = cleanAndValidateWA(whatsapp);
      if (!cleanedWA) {
        alert("Nomor WhatsApp tidak valid. Harus dimulai dengan 08 atau 62.");
        setLoading(false);
        return;
      }

      // address cleaning/validation/match
      const addressCleaned = cleanAddress(address);
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

      // doc id and payload
      const safeBundleTitle = bundle?.title
        ? bundle.title.replace(/\s+/g, "-").toLowerCase()
        : "bundle";
      const orderId = `${cleanedWA}_${safeBundleTitle}_${Date.now()}`;
      const payload = {
        name,
        whatsapp: cleanedWA,
        address,
        addressClean: addressCleaned,
        price: bundle.price,
        costProduct: bundle.costProduct || 0,
        ongkir,
        paymentMethod,
        productTitle: bundle.title,
        productId: bundle.id || "unknown",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: "pending",
        resiCheck: "not",
        rts: 0,
        needsReview: needsReviewFlag,
        province: matched.province?.name || "",
        regency: matched.regency?.name || "",
        district: matched.district?.name || "",
        village: matched.village?.name || "",
      };

      // Save to Firestore (leads collection)
      await setDoc(doc(db, "leads", orderId), payload);

      console.log("Saving FULL ORDER:", payload);

      // FB Pixel (if available)
      if (window.fbq) {
        try {
          fbq("trackSingle", pixel, "Purchase", {
            content_name: bundle.title,
            content_ids: [bundle.id || bundle.title || "123"],
            content_type: "product",
            value: bundle.price || 0,
            currency: "IDR",
          });
        } catch (err) {
          console.error("FB Pixel Error:", err);
        }
      }

      // Send WA to admin
      const message =
        `*PESANAN BARU*\n\n` +
        `*Produk:* ${bundle.title}\n` +
        `*Nama:* ${name}\n` +
        `*No. WhatsApp:* ${cleanedWA}\n` +
        `*Alamat:* ${address}\n` +
        `*Metode Pembayaran:* ${paymentMethod}\n\n` +
        `Mohon segera diproses, terima kasih`;
      const whatsappURL = `https://wa.me/${adminWA}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappURL, "_blank");

      // Reset form
      setName("");
      setWhatsapp("");
      setAddress("");
      setPaymentMethod("COD");
      setBundle(bundles?.[0] || null);
    } catch (err) {
      console.error("Gagal simpan ke Firestore:", err);
      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Pilih Paket Produk:</h2>

      {bundles && bundles.length > 0 ? (
        <div className="space-y-4">
          {bundles.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                bundle?.id === item.id
                  ? "border-green-600 shadow-xl bg-green-50"
                  : "border-gray-300 hover:shadow-md"
              }`}
              onClick={() => setBundle(item)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.features && (
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="text-xs font-semibold">
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-redto">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                  {item.badge && (
                    <span className="mt-2 inline-block bg-redto text-white text-xs text-center px-2 py-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">⚠ Tidak ada paket tersedia.</p>
      )}

      <h2 className="text-xl font-bold mt-6 mb-4">Data Penerima:</h2>
      <form onSubmit={handleSubmit}>
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

        <h3 className="text-lg font-bold mb-2">Metode Pembayaran:</h3>
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-2xl ${buttonColor} text-white font-bold py-2 px-4 rounded-lg transition ${
            loading ? "opacity-50 cursor-not-allowed" : buttonHoverColor
          }`}
        >
          {loading ? "Memproses..." : "Konfirmasi Pesanan Di WhatsApp"}
        </button>
      </form>
    </div>
  );
};

export default FunnelPurchaseBundlesAllInOne;
