// addressCleaner.js
import { provinceDictionary } from "./data/provinceDictionary.js";
import { kabupatenDictionary } from "./data/kabupatenDictionary.js";
import { kecamatanDictionary } from "./data/kecamatanDictionary.js";
import { desaDictionary } from "./data/desaDictionary.js";
import { rtrwDictionary } from "./data/rtrwDictionary.js";
import { streetDictionary } from "./data/streetDictionary.js";

const dictionary = {
  ...provinceDictionary,
  ...kabupatenDictionary,
  ...kecamatanDictionary,
  ...desaDictionary,
  ...rtrwDictionary,
  ...streetDictionary,
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
