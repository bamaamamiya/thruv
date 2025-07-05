import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // path sesuai struktur file kamu
const FunnelPurchase = ({ pixel, product, price}) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [address, setAddress] = useState(""); // <-- Tambahan

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
				price,
        address,
        paymentMethod,
        productTitle: product.title,
        productId: product.id || "unknown",
        createdAt: Timestamp.now(),
				status:"Pending"
      });
      console.log("Data disimpan ke Firestore!");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      return; // stop lanjut
    }

    // ✅ Facebook Pixel trigger
    if (window.fbq) {
      fbq("trackSingle", pixel, "Purchase", {
        content_name: product.title,
        content_ids: [product.id || "123"],
        content_type: "product",
        value: product.price || 0,
        currency: "IDR",
      });
    }

    // ✅ Kirim ke WhatsApp Admin
    setTimeout(() => {
      const message =
        `*PESANAN BARU*\n\n` +
        `*Produk:* ${product.title}\n` +
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
          <label id="addrest" className="block font-semibold mb-1">
            Alamat Lengkap
          </label>
          <textarea
            placeholder="Masukkan Nomor Rumah, RT/RW, Kecamatan, Kota/Kab, Ciri2 Rumah"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring resize-none"
          />
        </div>

        <h3 className="text-lg font-bold mb-3">Metode Pembayaran:</h3>
        <div className="mb-4">
          {["Bank Transfer","COD"].map((method) => (
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
                className="cursor-pointer grid items-center"
              >
                <img
                  src={`/images/funnel/${
                    method === "COD" ? "cod" : "transfer"
                  }.webp`}
                  alt={method}
                  className="w-12 h-12 object-contain"
                />
                <span className="font-medium">
                  {method === "COD" ? "Bayar di Tempat" : "Bank Transfer"}
                </span>
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
