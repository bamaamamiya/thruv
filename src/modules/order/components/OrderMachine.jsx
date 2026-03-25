import React, { useRef, useState } from "react";

// hooks
import { useOrderForm } from "../hooks/useOrderForm";

// services
import { saveOrUpdateAbandonedLead } from "../services/leadService";
import { createOrder } from "../services/orderService";
import {
  sendOrderEmail,
  redirectToWhatsApp,
} from "../services/notificationService";

// utils
import { cleanAndValidateWA } from "../utils/waHelper";
import { cleanAddress } from "../../../utils/addressCleaner";
import { validateAddress } from "../../../utils/addressValidator";
import { matchAddress } from "../../../utils/addressMatcher";
import { calculateOngkir } from "../../../utils/calculateOngkir";

const OrderMachine = ({
  product,
  pixel,
  adminWA = "6282387881505",
  useOngkir = true,
}) => {
  const {
    name,
    setName,
    whatsapp,
    setWhatsapp,
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
  } = useOrderForm();

  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  // === Debounced Abandoned Lead ===
  const handleAbandoned = (newData) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const cleanedWA = cleanAndValidateWA(newData.whatsapp);
      if (!cleanedWA) return;

      await saveOrUpdateAbandonedLead({
        ...newData,
        whatsapp: cleanedWA,
        product,
      });
    }, 1500);
  };

  // === Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (!name || !whatsapp || !address) {
        throw new Error("Isi data lengkap!");
      }

      const cleanedWA = cleanAndValidateWA(whatsapp);
      if (!cleanedWA) throw new Error("WA tidak valid");

      const addressCleaned = cleanAddress(address);
      const validation = validateAddress(addressCleaned);

      if (!validation.valid) {
        throw new Error(validation.reason);
      }

      let matched = {};
      let ongkir = 0;
      let needsReview = false;

      if (useOngkir) {
        matched = await matchAddress(addressCleaned);

        if (!matched.province) {
          throw new Error("Provinsi tidak ditemukan");
        }

        ongkir = calculateOngkir(matched.province.name);
        needsReview = validation.needsReview || !matched.success;
      }

      // 🔥 Create Order
      await createOrder({
        cleanedWA,
        name,
        addressCleaned,
        paymentMethod,
        product,
        ongkir,
        matched,
        needsReview,
      });

      // 🔥 Email
      await sendOrderEmail({
        name,
        whatsapp: cleanedWA,
        address,
        productTitle: product.title,
        total: product.pricing.price + ongkir,
        paymentMethod,
        order_date: new Date().toLocaleString("id-ID"),
      });

      // 🔥 Redirect WA
      const message = `PESANAN BARU\n\nProduk: ${product.title}\nNama: ${name}`;
      redirectToWhatsApp(adminWA, message);

      // reset
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

  // === UI ===
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nama"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleAbandoned({
              name: e.target.value,
              whatsapp,
              address,
            });
          }}
        />

        <input
          placeholder="WA"
          value={whatsapp}
          onChange={(e) => {
            const wa = e.target.value.replace(/\D/g, "");
            setWhatsapp(wa);
            handleAbandoned({
              name,
              whatsapp: wa,
              address,
            });
          }}
        />

        <textarea
          placeholder="Alamat"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            handleAbandoned({
              name,
              whatsapp,
              address: e.target.value,
            });
          }}
        />

        <button disabled={loading}>
          {loading ? "Processing..." : "Order Now"}
        </button>
      </form>
    </div>
  );
};

export default OrderMachine;
