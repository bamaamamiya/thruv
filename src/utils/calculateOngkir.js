const ongkirMap = {
  "DKI Jakarta": 20000,
  "Jawa Barat": 20000,
  "Jawa Tengah": 20000,
  "Jawa Timur": 25000,
  "Bali": 35000,
  "Banten": 20000,
};

export const calculateOngkir = (provinceName) => {
  return ongkirMap[provinceName] || 20000;
};