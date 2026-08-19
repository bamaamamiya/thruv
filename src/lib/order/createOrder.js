import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

export async function createOrder({
  orderId,
  customer,
  product,
  selectedBundle,
  pricing,
  paymentMethod,
  checkout,
  automation,
  provinceName,
}) {
  const now = Timestamp.now();

  const orderData = {
    // CUSTOMER
    name: customer.name,
    whatsapp: customer.whatsapp,
    addressClean: customer.address,
    paymentMethod,

    // PRODUCT
    productId: product.id,
    productTitle: product.title,

    bundleId: checkout.bundle
      ? selectedBundle?.id || null
      : null,

    bundleTitle: checkout.bundle
      ? selectedBundle?.title || null
      : null,

    bundleQty: checkout.bundle
      ? selectedBundle?.quantity || 1
      : 1,

    bundleBadge: checkout.bundle
      ? selectedBundle?.badge || ""
      : "",

    // PRICING
    price: pricing.price,
    costProduct: pricing.costProduct,
    ongkir: pricing.ongkir,
    total: pricing.total,

    // BUSINESS
    status: "pending",
    state: "NEW",

    // AUTOMATION
    queuedForMessage: false,
    aiStatus: automation.aiAgent
      ? "QUEUED"
      : "SKIPPED",

    aiProcessingAt: null,
    aiLastSentAt: null,
    aiRetryCount: 0,

    // WHATSAPP
    chatId: null,

    // LOGISTIC
    resiCheck: "not",
    rts: 0,

    // VALIDATION
    needsReview: false,

    // LOCATION
    province: checkout.ongkir
      ? provinceName
      : "",

    // TIME
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(
    doc(db, "leads", orderId),
    orderData,
  );

  return orderData;
}
