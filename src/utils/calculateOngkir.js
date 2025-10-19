export const calculateOngkir = (provinceName) => {
  let ongkir = 20000; // default 20k

  if (!provinceName) return ongkir;

  switch (provinceName.toLowerCase()) {
    case "jawa timur":
      ongkir = 30000;
      break;
    case "bali":
      ongkir = 35000;
      break;
    default:
      ongkir = 20000;
  }

  return ongkir;
};
