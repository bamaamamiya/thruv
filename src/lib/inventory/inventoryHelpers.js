export const INVENTORY_TRANSACTION_TYPES = {
  IN: "IN",
  OUT: "OUT",
  ADJUSTMENT: "ADJUSTMENT",
};

export const INVENTORY_REASONS = {
  RESTOCK: "restock",
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