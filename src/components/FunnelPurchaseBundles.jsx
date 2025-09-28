import React, { useState } from "react";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import { cleanAddress, needsReview } from "../utils/addressCleaner";

const FunnelPurchaseBundles = ({
  pixel,
  product,
  bundles = [],
  discountTransfer,
  price,
  costProduct,
  buttonColor = "bg-redto", // default warna tombol
  buttonHoverColor = "hover:bg-red-700", // default hover
}) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [bundle, setBundle] = useState(bundles?.[0] || null);
  const [loading, setLoading] = useState(false);

  // const emailJSConfigs = [
  //   {
  //     serviceID: "service_ibqyju2",
  //     templateID: "template_jwgdbwb",
  //     publicKey: "2eHmhZIn-wgy07zki",
  //   },
  //   {
  //     serviceID: "service_7xk5qdi",
  //     templateID: "template_rsvrrcr",
  //     publicKey: "r6eSMw--zC23rNBwt",
  //   },
  // ];
  const getCurrentEmailJS = () => {
    const day = new Date().getDate();
    return day <= 15 ? emailJSConfigs[0] : emailJSConfigs[1];
  };

  const cleanAndValidateWA = (wa) => {
    let cleaned = wa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    return /^62[0-9]{9,13}$/.test(cleaned) ? cleaned : null;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (!name || !whatsapp || !address) {
      alert("Silakan isi semua data dengan lengkap!");
      return setLoading(false);
    }
    if (!bundle) {
      alert("Produk tidak ditemukan!");
      return setLoading(false);
    }
    if (address.length < 30) {
      alert("Alamat terlalu singkat. Mohon isi alamat lengkap.");
      return setLoading(false);
    }

    const cleanedWA = cleanAndValidateWA(whatsapp);
    if (!cleanedWA) {
      alert("Nomor WhatsApp tidak valid. Harus dimulai dengan 08 atau 62.");
      return setLoading(false);
    }

    const docId = `${cleanedWA}_${bundle.id || "unknown"}`;
    const totalPrice = bundle.price;
    const addressCleaned = cleanAddress(address);

    try {
      await setDoc(doc(db, "leads", docId), {
        name,
        whatsapp: cleanedWA,
        price: bundle.price,
        costProduct: bundle.costProduct || 0,
        address,
        addressClean: addressCleaned,
        paymentMethod,
        productTitle: bundle.title,
        productId: bundle.id || "unknown",
        createdAt: Timestamp.now(),
        status: "pending",
        resiCheck: "not",
        rts: 0,
        needsReview: needsReview(address),
      });

      if (window.fbq) {
        try {
          fbq("trackSingle", pixel, "Purchase", {
            content_name: bundle.title,
            content_ids: [bundle.id || "123"],
            content_type: "product",
            value: bundle.price || 0,
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
        productTitle: bundle.title, // ini juga harus bundle biar sesuai pilihan
        productId: bundle.id || "unknown",
        price: bundle.price, // ✅ fix
        total: totalPrice,
        paymentMethod,
        order_date: new Date().toLocaleString("id-ID"),
      });

      const message =
        `*PESANAN BARU*\n\n` +
        `*Produk:* ${bundle.title}\n` +
        `*Nama:* ${name}\n` +
        `*No. WhatsApp:* ${cleanedWA}\n` +
        `*Alamat:* ${address}\n` +
        `*Metode Pembayaran:* ${paymentMethod}\n\n` +
        `Mohon segera diproses, terima kasih`;

      window.open(
        `https://wa.me/6282387881505?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      setName("");
      setWhatsapp("");
      setAddress("");
      setPaymentMethod("COD");
      setBundle(bundles[0]);
    } catch (err) {
      console.error("Gagal simpan ke Firestore:", err);
      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

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
                  <p className="text-2xl font-bold text-green-700">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                  {item.badge && (
                    <span className="mt-2 inline-block bg-green-600 text-white text-xs text-center px-2 py-1 rounded">
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
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Masukkan No. WhatsApp Aktif"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">Alamat Lengkap :</label>
          <textarea
            placeholder="Masukkan Nomor Rumah, RT/RW, Kecamatan, Kota/Kab, Ciri2 Rumah"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-2xl bg-redto text-white font-bold py-2 px-4 rounded-lg transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
        >
          {loading ? "Memproses..." : "Konfirmasi Pesanan Di WhatsApp"}
        </button>
      </form>
    </div>
  );
};

export default FunnelPurchaseBundles;
