// addressCleaner.js
const dictionary = {
  jl: "Jalan",
  jln: "Jalan",
  kec: "Kecamatan",
  kab: "Kabupaten",
  kel: "Kelurahan",
  ds: "Desa",
  rt: "RT",
  rw: "RW",
  komp: "Kompleks",
  blok: "Blok",
  perum: "Perumahan",
};

export const cleanAddress = (addr) => {
  if (!addr) return "";

  let cleaned = addr.trim();
  cleaned = cleaned.replace(/\s+/g, " ");
  cleaned = cleaned.replace(/\./g, " ");

  Object.keys(dictionary).forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    cleaned = cleaned.replace(regex, dictionary[key]);
  });

  cleaned = cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  return cleaned;
};

export const needsReview = (addr) => {
  if (!addr) return true;
  if (addr.length < 25) return true;

  const keywords = ["RT", "RW", "Kecamatan", "Kabupaten", "Kota", "Desa", "Kelurahan"];
  const foundKeyword = keywords.some((kw) =>
    addr.toLowerCase().includes(kw.toLowerCase())
  );

  return !foundKeyword;
};
