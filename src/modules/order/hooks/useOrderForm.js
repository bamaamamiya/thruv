// hooks/useOrderForm.js
import { useState } from "react";

export const useOrderForm = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  return {
    name,
    setName,
    whatsapp,
    setWhatsapp,
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
  };
};