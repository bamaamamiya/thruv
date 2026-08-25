import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

export const INVENTORY_TRANSACTION_TYPES = {
  IN: "IN",
  OUT: "OUT",
  ADJUSTMENT: "ADJUSTMENT",
};

export const INVENTORY_REASONS = {
  RESTOCK: "restock",
  INITIAL_STOCK: "initial_stock",
  ORDER: "order",
  CANCEL: "cancel",
  RTS: "rts",
  DAMAGE: "damage",
  LOST: "lost",
  ADJUSTMENT: "adjustment",
};

export function normalizeQuantity(value) {
  const quantity = Number(value);

  if (!Number.isFinite(quantity)) {
    return 0;
  }

  return Math.floor(quantity);
}

export async function initializeInventory({
  productId,
  initialStock = 0,
  leadTimeDays = 4,
  safetyStockDays = 2,
  targetStockDays = 10,
}) {
  if (!productId) {
    throw new Error("productId wajib.");
  }

  const stock = normalizeQuantity(initialStock);

  if (stock < 0) {
    throw new Error("Initial stock tidak boleh negatif.");
  }

  const inventoryRef = doc(
    db,
    "inventory",
    productId,
  );

  await runTransaction(db, async (transaction) => {
    const inventorySnapshot =
      await transaction.get(inventoryRef);

    // Jangan overwrite inventory kalau sudah ada.
    if (inventorySnapshot.exists()) {
      throw new Error(
        `Inventory ${productId} sudah ada.`,
      );
    }

    transaction.set(inventoryRef, {
      productId,

      currentStock: stock,

      leadTimeDays,
      safetyStockDays,
      targetStockDays,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Kalau initial stock > 0,
    // buat transaction IN untuk audit trail.
    if (stock > 0) {
      const transactionRef = doc(
        collection(db, "inventoryTransactions"),
      );

      transaction.set(transactionRef, {
        productId,

        type: INVENTORY_TRANSACTION_TYPES.IN,

        quantity: stock,

        stockBefore: 0,

        stockAfter: stock,

        reason: INVENTORY_REASONS.INITIAL_STOCK,

        note: "Initial inventory",

        orderId: null,

        createdAt: serverTimestamp(),
      });
    }
  });
}

export async function removeInventoryStock({
  productId,
  quantity,
  reason = INVENTORY_REASONS.ORDER,
  note = "",
  orderId = null,
}) {
  if (!productId) {
    throw new Error("productId wajib.");
  }

  const amount = normalizeQuantity(quantity);

  if (amount <= 0) {
    throw new Error(
      "Quantity harus lebih besar dari 0.",
    );
  }

  const inventoryRef = doc(
    db,
    "inventory",
    productId,
  );

  const transactionRef = doc(
    collection(db, "inventoryTransactions"),
  );

  await runTransaction(db, async (transaction) => {
    const inventorySnapshot =
      await transaction.get(inventoryRef);

    if (!inventorySnapshot.exists()) {
      throw new Error(
        `Inventory ${productId} belum dibuat.`,
      );
    }

    const currentStock = Number(
      inventorySnapshot.data().currentStock || 0,
    );

    if (currentStock < amount) {
      throw new Error(
        `Stock ${productId} tidak cukup. Tersedia: ${currentStock}`,
      );
    }

    const nextStock = currentStock - amount;

    transaction.update(inventoryRef, {
      currentStock: nextStock,
      updatedAt: serverTimestamp(),
    });

    transaction.set(transactionRef, {
      productId,

      type: INVENTORY_TRANSACTION_TYPES.OUT,

      quantity: amount,

      stockBefore: currentStock,

      stockAfter: nextStock,

      reason,

      note,

      orderId,

      createdAt: serverTimestamp(),
    });
  });
}