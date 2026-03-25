// utils/calculateOngkir.js
const shippingMap = {
  jakarta: 20000,
  "dki jakarta": 20000,
  jkt: 20000,

  "jawa barat": 20000,
  jabar: 20000,

  "jawa tengah": 20000,
  jateng: 20000,

  "jawa timur": 25000,
  jatim: 25000,

  "di yogyakarta": 23000,
  yogyakarta: 23000,
  jogja: 23000,
  diy: 23000,

  bali: 35000,
  banten: 20000, // default seperti Jabar
  "sumatera utara": 30000,
  "sumatera barat": 30000,
  "sumatera selatan": 30000,
  "sulawesi selatan": 30000,
  "sulawesi utara": 30000,
  "kalimantan selatan": 30000,
  papua: 40000,
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