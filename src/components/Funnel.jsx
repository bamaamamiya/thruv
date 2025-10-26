import React, { useState } from "react";
import { useAbandonedLead } from "../hooks/useAbandonedLead";
import { useOrderHandler } from "../hooks/useOrderHandler";
import { cleanAndValidateWA } from "../helpers/whatsapp";
import PaymentMethod from "./PaymentMethod";

const FunnelPurchaseAllInOne = ({
  pixel,
  product,
  price,
  costProduct,
  adminWA = "6282387881505",
  discountTransfer,
  buttonColor = "bg-redto",
  buttonHoverColor = "hover:bg-red-700",
}) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveAbandonedLead } = useAbandonedLead(product, cleanAndValidateWA);
  const { handleOrderSubmit } = useOrderHandler(pixel, product, adminWA);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await handleOrderSubmit({
        name,
        whatsapp,
        address,
        paymentMethod,
        price,
        cleanAndValidateWA,
      });

      setName("");
      setWhatsapp("");
      setAddress("");
      setPaymentMethod("COD");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Data Penerima:</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            saveAbandonedLead(e.target.value, whatsapp, address);
          }}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <input
          type="text"
          placeholder="Masukkan No. WhatsApp Aktif"
          value={whatsapp}
          onChange={(e) => {
            const wa = e.target.value.replace(/\D/g, "");
            setWhatsapp(wa);
            saveAbandonedLead(name, wa, address);
          }}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <textarea
          placeholder="Masukkan alamat lengkap Anda"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            saveAbandonedLead(name, whatsapp, e.target.value);
          }}
          rows={4}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <h3 className="text-lg font-bold mb-2">Metode Pembayaran:</h3>
        <PaymentMethod
          methods={["COD", "Bank Transfer"]}
          selected={paymentMethod}
          onSelect={setPaymentMethod}
          discountTransfer={false}
        />

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

export default FunnelPurchaseAllInOne;
