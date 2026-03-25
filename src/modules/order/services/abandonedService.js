// services/abandonedService.js
import { db } from "../../../firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export const saveAbandonedLead = async ({
  name,
  whatsapp,
  address,
  product,
}) => {
  const docId = `${whatsapp}_${product.title}`;
  const docRef = doc(db, "abandonedLeads", docId);

  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    await setDoc(
      docRef,
      {
        name,
        whatsapp,
        address,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  } else {
    await setDoc(docRef, {
      name,
      whatsapp,
      address,
      productTitle: product.title,
      status: "abandoned",
      createdAt: Timestamp.now(),
    });
  }
};