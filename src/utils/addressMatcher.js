// utils/addressMatcher.js
import { cleanAddress } from "./addressCleaner.js";

const BASE_API = "https://flow-ship.vercel.app/api";
// -> ambil dari hasil merge (bisa juga taruh di GitHub)
const normalize = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");
};

const safeFetch = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("❌ Fetch error:", url, e);
    return [];
  }
};

export const matchAddress = async (rawAddress) => {
  const cleaned = cleanAddress(rawAddress).toLowerCase();
  const normalizedAddress = normalize(cleaned);
  // Ambil dataset utama
  const provinces = await safeFetch(`${BASE_API}/provinces.json`);
  const regencies = await safeFetch(`${BASE_API}/regencies.json`);
  const districts = await safeFetch(`${BASE_API}/districts.json`);
  const villages = await safeFetch(`${BASE_API}/villages.json`);

  // Cari provinsi
  const province = provinces.find((p) =>
    normalizedAddress.includes(normalize(p.name)),
  );

  const regency = regencies.find((r) =>
    normalizedAddress.includes(normalize(r.name)),
  );

  const district = districts.find((d) =>
    normalizedAddress.includes(normalize(d.name)),
  );

  const village = villages.find((v) =>
    normalizedAddress.includes(normalize(v.name)),
  );

  return {
    success: !!province,
    cleaned,
    province,
    regency,
    district,
    village,
  };
};
