// utils/addressValidator.js
export const checkAddressLevel = (address) => {
  if (!address) return "bad";

  const lower = address.toLowerCase().trim();

  // blacklist kata fiktif / dummy
  const blacklist = ["tes", "asdf", "qwerty", "coba", "kosong", "rumah saya"];
  if (blacklist.some((word) => lower.includes(word))) {
    return "bad"; // ❌ jelek
  }

  // validasi dasar
  const hasStreet = /(jl\.|jalan|gang|gg|perum|kp|komp)/.test(lower);
  const hasCity = /(kota|kab|provinsi|kecamatan)/.test(lower);
  const hasRT = /(rt|rw|no)/.test(lower); // nomor rumah / RT/RW

  if (hasStreet && hasCity && hasRT && address.length >= 30) {
    return "good"; // ✅ bagus
  }

  if (hasStreet && hasCity) {
    return "medium"; // ⚠️ medium
  }

  return "bad"; // ❌ jelek
};
