import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase";

export async function getInventory(productId) {
  const inventoryRef = doc(db, "inventory", productId);

  const inventorySnap = await getDoc(inventoryRef);

  if (!inventorySnap.exists()) {
    throw new Error("Inventory tidak ditemukan.");
  }

  const inventoryData = inventorySnap.data();

  const transactionsQuery = query(
    collection(db, "inventoryTransactions"),
    where("productId", "==", productId),
    orderBy("createdAt", "desc"),
  );

  const transactionsSnap = await getDocs(transactionsQuery);

  const transactions = transactionsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    id: productId,
    ...inventoryData,
    transactions,
  };
}
