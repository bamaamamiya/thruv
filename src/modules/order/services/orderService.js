// services/orderService.js
import { db } from "../../../firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createOrder = async ({
  cleanedWA,
  name,
  addressCleaned,
  paymentMethod,
  product,
  ongkir,
  matched,
  needsReview,
}) => {
  const orderId = `${cleanedWA}_${product.id}_${Date.now()}`;

  const price = product.pricing.price || 0;
  const costProduct = product.pricing.cost || 0;
  const total = price + ongkir;

  return setDoc(doc(db, "leads", orderId), {
    name,
    whatsapp: cleanedWA,
    addressClean: addressCleaned,
    paymentMethod,

    productId: product.id,
    productTitle: product.title,

    price,
    costProduct,

    ongkir,
    total,

    state: "WAITING_CONFIRMATION",
    lastMessageState: null,

    status: "pending",
    confirmation: "belum",

    automation: true,
    messageSent: false,
    sendAt: Timestamp.fromMillis(Date.now() + 60000),

    province: matched?.province?.name || "",
    regency: matched?.regency?.name || "",

    needsReview,

    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
};