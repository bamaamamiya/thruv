import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { cleanAddress } from "../utils/addressCleaner";
import { validateAddress } from "../utils/addressValidator";
import { matchAddress } from "../utils/addressMatcher";
import { calculateOngkir } from "../utils/calculateOngkir";
import { openWhatsappAdmin } from "../helpers/whatsapp";

export const useOrderHandler = (pixel, product, adminWA) => {
  const sendOrderEmail = async (data) => {
    try {
      const res = await fetch("https://order-alert-six.vercel.app/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Email send failed");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  const handleOrderSubmit = async ({ name, whatsapp, address, paymentMethod, price, cleanAndValidateWA }) => {
    const cleanedWA = cleanAndValidateWA(whatsapp);
    if (!cleanedWA) throw new Error("Invalid WhatsApp number");

    const addressCleaned = cleanAddress(address);
    const validation = validateAddress(addressCleaned);
    if (!validation.valid) throw new Error(validation.reason);

    const matched = await matchAddress(addressCleaned);
    const ongkir = calculateOngkir(matched.province?.name);
    const needsReview = validation.needsReview || !matched.success;
    const totalPrice = price + ongkir;

    const safeProductTitle = product?.title?.replace(/\s+/g, "-").toLowerCase() || "default";
    const orderId = `${cleanedWA}_${safeProductTitle}_${Date.now()}`;

    await setDoc(doc(db, "leads", orderId), {
      name,
      whatsapp: cleanedWA,
      address,
      addressClean: addressCleaned,
      price,
      costProduct: product.costProduct || 0,
      paymentMethod,
      productTitle: product.title,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: "pending",
      resiCheck: "not",
      confirmation: "belum",
      customerConfirmed: false,
      rts: 0,
      needsReview,
      province: matched.province?.name || "",
      regency: matched.regency?.name || "",
      district: matched.district?.name || "",
      village: matched.village?.name || "",
    });

    if (window.fbq) {
      try {
        fbq("trackSingle", pixel, "Purchase", {
          content_name: product.title,
          content_ids: [product.title],
          content_type: "product",
          value: price,
          currency: "IDR",
        });
      } catch (err) {
        console.error("FB Pixel Error:", err);
      }
    }

    await sendOrderEmail({
      name,
      whatsapp: cleanedWA,
      address,
      productTitle: product.title,
      price,
      total: totalPrice,
      paymentMethod,
      order_date: new Date().toLocaleString("id-ID"),
    });

    openWhatsappAdmin(adminWA, product.title, name, cleanedWA, address, paymentMethod);
  };

  return { handleOrderSubmit };
};
