import React, { useState } from "react";
import { collection, setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";

const FunnelPurchase = ({ pixel, product, price, costProduct }) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const emailJSConfigs = [
    {
      serviceID: "service_ibqyju2",
      templateID: "template_jwgdbwb",
      publicKey: "2eHmhZIn-wgy07zki",
    },
    {
      serviceID: "service_7xk5qdi",
      templateID: "template_rsvrrcr",
      publicKey: "r6eSMw--zC23rNBwt",
    },
  ];

  const getCurrentEmailJS = () => {
    const now = new Date();
    const day = now.getDate(); // 1–31

    // Ganti setiap 2 minggu (15 hari)
    const isFirstHalf = day <= 15;
    return isFirstHalf ? emailJSConfigs[0] : emailJSConfigs[1];
  };

  // ✅ Format & Validasi Nomor WhatsApp
  const cleanAndValidateWA = (wa) => {
    let cleaned = wa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
    const isValid = /^62[0-9]{9,13}$/.test(cleaned);
    return isValid ? cleaned : null;
  };


  // ✅ Kirim Email via EmailJS
  const sendOrderEmail = async (data) => {
    const { serviceID, templateID, publicKey } = getCurrentEmailJS();

    const templateParams = {
      order_id: `${data.whatsapp}_${data.productId}`,
      name: data.name,
      whatsapp: data.whatsapp,
      address: data.address,
      product_title: data.productTitle,
      price: data.price.toLocaleString("id-ID"),
      total: data.total.toLocaleString("id-ID"),
      payment_method: data.paymentMethod,
      order_date: data.order_date,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log("Email sent successfully from", serviceID);
    } catch (err) {
      console.error("Email sending failed:", err);
    }
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;
  setLoading(true);

  // Validasi dulu...
  if (!name || !whatsapp || !address) {
    alert("Silakan isi semua data dengan lengkap!");
    setLoading(false);
    return;
  }

  const cleanedWA = cleanAndValidateWA(whatsapp);
  if (!cleanedWA) {
    alert("Nomor WhatsApp tidak valid.");
    setLoading(false);
    return;
  }

  // 1️⃣ Buat pesan & link WA
  const message = `*PESANAN BARU*\n\n` +
    `*Produk:* ${product.title}\n` +
    `*Nama:* ${name}\n` +
    `*No. WhatsApp:* ${cleanedWA}\n` +
    `*Alamat:* ${address}\n` +
    `*Metode Pembayaran:* ${paymentMethod}\n` +
		
    `Mohon segera diproses, terima kasih`;

  const ADMIN_WA = "6282387881505";
  const whatsappURL = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;

  // 2️⃣ Langsung buka WA (biar tidak kena popup block)
  window.open(whatsappURL, "_blank");

  // 3️⃣ Simpan ke Firestore di background
  try {
    await setDoc(doc(db, "leads", `${cleanedWA}_${product.id || "unknown"}`), {
      name,
      whatsapp: cleanedWA,
      price,
      costProduct: product.costProduct || 0,
      address,
      paymentMethod,
      productTitle: product.title,
      productId: product.id || "unknown",
      createdAt: Timestamp.now(),
      status: "pending",
      resiCheck: "not",
    });

    await sendOrderEmail({
      name,
      whatsapp: cleanedWA,
      address,
      productTitle: product.title,
      productId: product.id || "unknown",
      price,
      total: price + (paymentMethod === "COD" ? 5000 : 0),
      paymentMethod,
      order_date: new Date().toLocaleString("id-ID"),
    });

    console.log("Data tersimpan & email terkirim");
  } catch (err) {
    console.error("Gagal simpan:", err);
  } finally {
    setLoading(false);
  }
};


  // ✅ UI Form
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Data Penerima:</h2>
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
              className={`flex items-center cursor-pointer border-2 p-4 rounded-md mb-2`}
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

export default FunnelPurchase;
