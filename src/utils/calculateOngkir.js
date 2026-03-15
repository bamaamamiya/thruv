export const calculateOngkir = (provinceName) => {
  if (!provinceName) return 20000;

  const shippingMap = {
    "banten": 20000,
    "dki jakarta": 20000,
    "jakarta": 20000,
    "jawa barat": 20000,
    "jawa tengah": 20000,
    "di yogyakarta": 23000,
    "yogyakarta": 23000,
    "jawa timur": 25000,
    "bali": 35000,
  };

  const normalized = provinceName.toLowerCase().trim();

  return shippingMap[normalized] || 20000; // default luar area
};