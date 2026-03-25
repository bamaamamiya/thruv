// utils/calculateOngkir.js
const shippingMap = {
  "jakarta": 20000,
  "dki jakarta": 20000,
  "jkt": 20000,
  "jawa barat": 20000,
  "jabar": 20000,
  "jawa tengah": 20000,
  "jateng": 20000,
  "di yogyakarta": 23000,
  "yogyakarta": 23000,
  "jogja": 23000,
  "jawa timur": 25000,
  "jatim": 25000,
  "bali": 35000,
};

// Normalize input: lowercase, remove spaces & dots
const normalize = (text) =>
  text.toLowerCase().replace(/\s+|\./g, "").trim();

export const calculateOngkir = (provinceName) => {
  if (!provinceName) return 20000;

  const normalizedInput = normalize(provinceName);

  // Try to find a key that matches normalized input
  for (const key in shippingMap) {
    if (normalize(key) === normalizedInput) {
      return shippingMap[key];
    }
  }

  // fallback default
  return 20000;
};