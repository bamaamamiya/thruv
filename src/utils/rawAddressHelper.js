// utils/rawAddressHelper.js
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Update raw address user ke Firestore secara realtime
 * - dipanggil saat user ketik alamat
 * - selalu merge biar data lama nggak ketiban
 */
export const updateRawAddress = async (docId, rawAddress) => {
  if (!docId || !rawAddress) return;

  try {
    await setDoc(
      doc(db, "leads", docId),
      {
        address: rawAddress, // ✅ raw masuk
        updatedAt: new Date(),
      },
      { merge: true } // biar ga overwrite field lain
    );
    console.log("Raw address updated:", rawAddress);
  } catch (err) {
    console.error("Gagal update raw address:", err);
  }
};
