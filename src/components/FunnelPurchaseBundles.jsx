import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // path sesuai struktur file kamu
const FunnelPurchase = ({ pixel, product, price, bundles}) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState(""); // <-- Tambahan
	const [bundle, setBundle] = useState(bundles[0]);


  const handleSubmit = async () => {
    if (!name || !whatsapp || !address) {
      alert("Silakan isi semua data dengan lengkap!");
      return;
    }

    if (!product) {
      alert("Produk tidak ditemukan!");
      return;
    }

    if (address.length < 20) {
      alert(
        "Alamat terlalu singkat. Mohon isi alamat lengkap, termasuk nama jalan, RT/RW, kecamatan, dan patokan jika ada."
      );
      return;
    }

    // ✨ Bersihkan nomor WA dari simbol
    let cleanedWhatsapp = whatsapp.replace(/\D/g, "");
    if (cleanedWhatsapp.startsWith("0")) {
      cleanedWhatsapp = "62" + cleanedWhatsapp.slice(1);
    }

    // ✅ Validasi nomor WA
    const isValidWA = /^62[0-9]{9,13}$/.test(cleanedWhatsapp);
    if (!isValidWA) {
      alert(
        "Nomor WhatsApp tidak valid. Harus dimulai dengan 08 atau 62 dan hanya angka."
      );
      return;
    }

    // ✅ Simpan ke Firestore
    try {
      await addDoc(collection(db, "leads"), {
        name,
        whatsapp: cleanedWhatsapp,
        price:bundle.price,
        address,
        paymentMethod,
        productTitle: bundle.title,
        productId: bundle.id || "unknown",
        createdAt: Timestamp.now(),
        status: "Pending",
      });
      console.log("Data disimpan ke Firestore!");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      return; // stop lanjut
    }

    // ✅ Facebook Pixel trigger
    if (window.fbq) {
      fbq("trackSingle", pixel, "Purchase", {
        content_name: bundle.title,
        content_ids: [bundle.id || "123"],
        content_type: "product",
        value: bundle.price || 0,
        currency: "IDR",
      });
    }

    // ✅ Kirim ke WhatsApp Admin
    setTimeout(() => {
      const message =
        `*PESANAN BARU*\n\n` +
        `*Produk:* ${bundle.title}\n` +
        `*Nama:* ${name}\n` +
        `*No. WhatsApp:* ${cleanedWhatsapp}\n` +
        `*Alamat:* ${address}\n` +
        `*Metode Pembayaran:* ${paymentMethod}\n\n` +
        `Mohon segera diproses, terima kasih`;

      const whatsappURL = `https://wa.me/6282387881505?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappURL, "_blank");
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Pilih Paket Produk:</h2>
      {bundles.map((item) => (
        <div
          key={item.id}
          className="mb-2 flex items-center border rounded p-3"
        >
          <input
            type="radio"
            id={item.id}
            name="bundle"
            checked={bundle.id === item.id}
            onChange={() => setBundle(item)}
            className="mr-2"
          />
          <label htmlFor={item.id} className="cursor-pointer">
            <span className="font-medium">{item.title}</span>{" "}
            <span className="text-sm text-gray-500 ml-2">
              (Rp{item.price.toLocaleString("id-ID")})
            </span>
          </label>
        </div>
      ))}

      <h2 className="text-xl font-bold mb-4">Data Penerima:</h2>

      <form onSubmit={(e) => e.preventDefault()}>
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
            placeholder="No. WhatsApp Anda"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label id="addrest" className="block font-bold mb-1">
            Alamat Lengkap :
          </label>
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
                id="metodePick"
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="mr-2 cursor-pointer"
              />
              <label
                id="metodePayments"
                className="cursor-pointer grid items-center relative"
              >
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
                {/* ✨ Badge Rekomendasi untuk Transfer */}
                {/* {method === "Bank Transfer" && (
                  <span className="inline-block bg-redto/10 text-redto text-[11px] font-bold px-3 py-[2px] rounded-md shadow-sm border border-redto/70 capitalize tracking-wide">
                    🎁 Dapat Bonus & Potongan Ongkir
                  </span>
                )}

                {method === "COD" && (
                  <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-bold px-3 py-[2px] rounded-md shadow-sm border border-gray-400 capitalize tracking-wide">
                    ⚠️ Tanpa Bonus, Ongkir Normal
                  </span>
                )} */}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full text-2xl bg-redto text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Konfirmasi Pesanan Di WhatsApp
        </button>
      </form>
    </div>
  );
};

export default FunnelPurchase;
