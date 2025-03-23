import React, { useState } from "react";
import BundleOption from "./Funnel/BundleOption";

const FunnelAtc = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [bundle, setBundle] = useState("Beli 1");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleAddToCart = (bundleTitle) => {
    setBundle(bundleTitle);
    console.log("AddToCart Clicked:", bundleTitle);

    if (window.fbq) {
      console.log("Triggering AddToCart Event"); // <- tambahin log biar yakin
      fbq("track", "AddToCart", {
        content_name: bundleTitle,
        content_category: "Product Bundle",
      });
      console.log("FB Pixel Event Sent!");
    } else {
      console.log("FB Pixel not loaded!");
    }
  };

  const handleSubmit = () => {
    if (!name || !whatsapp) {
      alert("Silakan isi semua data!");
      return;
    }

    // Nomor WhatsApp customer service
    const customerServiceNumber = "6282392135589"; // Ganti dengan nomor CS Anda

    // Temukan bundle yang dipilih berdasarkan `bundle` yang ada di state
    const selectedBundle = bundles.find(
      (bundleOption) => bundleOption.title === bundle
    );

    // Pesan WhatsApp yang ingin dikirim
    const message = `Halo, saya ${name}. Saya tertarik memesan ${selectedBundle.title} ${selectedBundle.description} dengan metode pembayaran ${paymentMethod}`;

    // Redirect ke WhatsApp
    const whatsappURL = `https://wa.me/${customerServiceNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const bundles = [
    {
      title: "Beli 1",
      description: "Bonus 1 Kain Reffil",
      isRecommended: false,
      price: 479000,
      isPrice: 149000,
    },
    {
      title: "Beli 2",
      description: "Bonus 2 Kain Reffil",
      isRecommended: true,
      price: 958000,
      isPrice: 200000,
    },
    {
      title: "Beli 3",
      description: "Bonus 3 Kain Reffil",
      isRecommended: false,
      price: 1000000,
      isPrice: 250000,
    },
  ];
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
        <div className="space-y-2">
          {bundles.map((bundleOption) => (
            <BundleOption
              key={bundleOption.title}
              title={bundleOption.title}
              description={bundleOption.description}
              isRecommended={bundleOption.isRecommended}
              isActive={bundle === bundleOption.title}
              price={bundleOption.price}
              isPrice={bundleOption.isPrice}
              onClick={() => handleAddToCart(bundleOption.title)} // Panggil AddToCart di sini
            />
          ))}
        </div>

        {/* metode pembayaran */}
        <br />
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
