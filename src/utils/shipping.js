export const getOngkir = (province, regency) => {
  // Contoh rules
  if (province.toLowerCase() === "bali" && regency.toLowerCase().includes("denpasar")) {
    return 35000; // ongkir khusus Bali
  }
  if (province.toLowerCase() === "jakarta") {
    return 20000; // ongkir khusus Jakarta
  }
  return 45000; // ongkir normal
};
