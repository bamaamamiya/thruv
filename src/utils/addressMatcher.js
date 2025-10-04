// utils/addressMatcher.js
import { cleanAddress } from "./addressCleaner.js";

const BASE_API = "https://flow-ship.vercel.app/api"; 
// -> ambil dari hasil merge (bisa juga taruh di GitHub)

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

  // Ambil dataset utama
  const provinces = await safeFetch(`${BASE_API}/provinces.json`);
  const regencies = await safeFetch(`${BASE_API}/regencies.json`);
  const districts = await safeFetch(`${BASE_API}/districts.json`);
  const villages = await safeFetch(`${BASE_API}/villages.json`);

  // Cari provinsi
  const province = provinces.find((p) =>
    cleaned.includes(p.name.toLowerCase())
  );

  // Cari kabupaten/kota
  const regency = regencies.find((r) =>
    cleaned.includes(r.name.toLowerCase())
  );

  // Cari kecamatan
  const district = districts.find((d) =>
    cleaned.includes(d.name.toLowerCase())
  );

  // Cari desa/kelurahan
  const village = villages.find((v) =>
    cleaned.includes(v.name.toLowerCase())
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
