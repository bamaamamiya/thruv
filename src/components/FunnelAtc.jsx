import React, { useState } from "react";

const FunnelAtc = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [bundle] = useState("Pel Tarik"); // Set default bundle (bisa kamu ubah kalau mau ganti default)

  const bundles = [
    {
      title: "Pel Tarik",
      description: "Bonus 1 Kain Reffil",
      price: 479000,
      isPrice: 149000,
    },
    {
      title: "Beli 2",
      description: "Bonus 2 Kain Reffil",
      price: 958000,
      isPrice: 200000,
    },
    {
      title: "Beli 3",
      description: "Bonus 3 Kain Reffil",
      price: 1000000,
      isPrice: 250000,
    },
  ];

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = () => {
    if (!name || !whatsapp) {
      alert("Silakan isi semua data!");
      return;
    }

    if (window.fbq) {
      console.log("Triggering AddToCart on Submit");
      fbq("trackSingle", '1250623926188998', "AddToCart", {
        content_name: bundle,
        content_category: "Product Bundle",
      });
    } else {
      console.log("FB Pixel not loaded!");
    }

    const customerServiceNumber = "6282392135589";

    const selectedBundle = bundles.find(
      (bundleOption) => bundleOption.title === bundle
    );

    const message = `Halo, saya ${name}. Saya tertarik memesan ${selectedBundle.title} dengan metode pembayaran ${paymentMethod}`;

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
            <label htmlFor="cod" className="cursor-pointer grid items-center ">
              <img
                src="/images/funnel/cod.webp"
                alt="COD"
                className="w-12 h-12 object-contain"
              />
              <span className="font-medium">Bayar di Tempat</span>
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
              <img
                src="/images/funnel/transfer.webp"
                alt="Bank Transfer"
                className="w-12 h-12 object-contain"
              />
              <span className="font-medium">Bank Transfer</span>
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

export default FunnelAtc;
