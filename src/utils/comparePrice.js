function getNormalPrice(sellingPrice, discountRate = 0.5) {
  const price = Number(sellingPrice) || 0;

  if (discountRate >= 1 || discountRate < 0) {
    throw new Error("Discount rate harus antara 0 dan 1");
  }

  return Math.round(price / (1 - discountRate));
}