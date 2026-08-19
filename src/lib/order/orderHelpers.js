import { calculateOngkir } from "../../utils/calculateOngkir";

export function getActivePricing({
  product,
  checkout,
  selectedBundle,
}) {
  if (checkout.bundle && selectedBundle) {
    return selectedBundle.pricing;
  }

  return product.pricing;
}

export function calculateOrderTotal({
  product,
  checkout,
  selectedBundle,
  provinceName,
}) {
  const activePricing = getActivePricing({
    product,
    checkout,
    selectedBundle,
  });

  const price = activePricing.price;
  const costProduct = activePricing.cost;

  const ongkir =
    checkout.ongkir && provinceName
      ? calculateOngkir(provinceName)
      : 0;

  return {
    price,
    costProduct,
    ongkir,
    total: price + ongkir,
  };
}

export function createOrderId(cleanedWA, productId) {
  return `${cleanedWA}_${productId}_${Date.now()}`;
}