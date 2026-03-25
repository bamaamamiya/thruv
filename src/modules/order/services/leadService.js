// services/leadService.js
import { db } from "../../../firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export const saveOrUpdateAbandonedLead = async ({
  name,
  whatsapp,
  address,
  product,
}) => {
  if (!name || name.length < 3) return;
  if (!whatsapp) return;

  const docId = `${whatsapp}_${product.title || "unknown"}`;
  const docRef = doc(db, "abandonedLeads", docId);

  try {
    const snapshot = await getDoc(docRef);

    const baseData = {
      name,
      whatsapp,
      address: address || "",
      updatedAt: Timestamp.now(),
    };

    if (snapshot.exists()) {
      await setDoc(docRef, baseData, { merge: true });
    } else {
      await setDoc(docRef, {
        ...baseData,
        productTitle: product.title,
        status: "abandoned",
        createdAt: Timestamp.now(),
      });
    }
  } catch (err) {
    console.error("Lead error:", err);
  }
};