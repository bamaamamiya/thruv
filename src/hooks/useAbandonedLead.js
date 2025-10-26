import { useRef } from "react";
import { setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useAbandonedLead = (product, cleanAndValidateWA) => {
  const debounceRef = useRef(null);

  const saveAbandonedLead = (name, whatsapp, address) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!name || name.length < 3) return;
      const cleanedWA = cleanAndValidateWA(whatsapp);
      if (!cleanedWA || !product) return;

      const docId = `${cleanedWA}_${product.title || "unknown"}`;
      const docRef = doc(db, "abandonedLeads", docId);

      try {
        const snapshot = await getDoc(docRef);
        await setDoc(
          docRef,
          {
            name,
            whatsapp: cleanedWA,
            address: address || "",
            updatedAt: Timestamp.now(),
            productTitle: product.title,
            ...(snapshot.exists() ? {} : { status: "abandoned", createdAt: Timestamp.now() }),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Failed to save abandoned lead:", err);
      }
    }, 1500);
  };

  return { saveAbandonedLead };
};
