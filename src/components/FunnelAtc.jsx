import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // path sesuai struktur file kamu
const FunnelAtc = ({ pixel, product }) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState(""); // <-- Tambahan

  const handleSubmit = async () => {
    if (!name || !whatsapp) {
      alert("Silakan isi semua data!");
      return;
    }

    if (!product) {
      alert("Produk tidak ditemukan!");
      return;
    }

		 // Simpan data ke Firestore
  try {
    await addDoc(collection(db, "leads"), {
      name,
      whatsapp,
      address,
      paymentMethod,
      productTitle: product.title,
      productId: product.id || "unknown",
      createdAt: Timestamp.now(),
    });
    console.log("Data disimpan ke Firestore!");
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
  }

    // FB Pixel trigger
  if (window.fbq) {
    fbq("trackSingle", pixel, "AddToCart", {
      content_name: product.title,
      content_ids: [product.id || "123"],
      content_type: "product",
      value: product.price || 0,
      currency: "IDR",
    });
  }

    setTimeout(() => {
      const message = `Halo, saya ${name}. Saya tertarik memesan ${product.title} dengan metode pembayaran ${paymentMethod}. Alamat lengkap saya : \n${address}`;
      const whatsappURL = `https://wa.me/6282387881505?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    }, 500); // 500ms delay biar AddToCart sempat dikirim
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
          <label id="addrest" className="block font-semibold mb-1">Alamat Lengkap</label>
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
              <label id="metodePayments" className="cursor-pointer grid items-center">
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

export default FunnelAtc;
