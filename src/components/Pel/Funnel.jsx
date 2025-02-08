import React, { useState } from "react";
import BundleOption from "./BundleOption";
const Funnel = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [bundle, setBundle] = useState("");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = () => {
    if (!name || !whatsapp) {
      alert("Silakan isi semua data!");
      return;
    }

    // Nomor WhatsApp customer service
    const customerServiceNumber = "6282387881505"; // Ganti dengan nomor CS Anda

    // Pesan WhatsApp yang ingin dikirim
    const message = `Halo, saya ${name}. Saya tertarik memesan ${bundle} dengan metode pembayaran ${paymentMethod}`;

    // Redirect ke WhatsApp
    const whatsappURL = `https://wa.me/${customerServiceNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Data Penerima:</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="whatsapp"
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="No. WhatsApp Anda"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        {/* nama & wa end */}

        <h3 className="text-lg font-bold mb-3">Pilih Bundle:</h3>

        {/* Gunakan komponen BundleOption */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <BundleOption
            title="Pel Tarik Premium"
            description="Pel + 1 Kain Reffil"
            isActive={bundle === "Paket A"}
            onClick={() => setBundle("Paket A")}
          />
          <BundleOption
            title="Paket B"
            description="Mop + Cairan Pembersih"
            isActive={bundle === "Paket B"}
            onClick={() => setBundle("Paket B")}
          />
          <BundleOption
            title="Paket C"
            description="Mop + Ember + Cairan Pembersih"
            isActive={bundle === "Paket C"}
            onClick={() => setBundle("Paket C")}
          />
        </div>

        {/* metode pembayaran */}
        <h3 className="text-lg font-bold mb-3">Metode Pembayaran:</h3>

        <div className="mb-4 ">
          <div
            className="flex items-center cursor-pointer border-2 p-4 rounded-md"
            onClick={() => handlePaymentChange("COD")}
          >
            <input
              type="radio"
              id="cod"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => handlePaymentChange("COD")}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="cod" className="cursor-pointer grid items-center">
              <div className="flex">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                  COD
                </span>
              </div>
              Bayar di Tempat
            </label>
          </div>

          <div
            className="flex items-center cursor-pointer border-2 p-4 rounded-md"
            onClick={() => handlePaymentChange("Bank Transfer")}
          >
            <input
              type="radio"
              id="bank"
              name="payment"
              value="Bank Transfer"
              checked={paymentMethod === "Bank Transfer"}
              onChange={() => handlePaymentChange("Bank Transfer")}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="bank" className="cursor-pointer grid items-center">
              <div>
                <span className="bg-blue-500 grid text-white text-xs font-bold px-2 py-1 rounded mr-2">
                  BANK
                  <span>TRANSFER</span>
                </span>
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full text-2xl bg-greentoo text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Konfirmasi Pesanan Di WhatsApp
        </button>
      </form>
    </div>
  );
};

export default Funnel;
