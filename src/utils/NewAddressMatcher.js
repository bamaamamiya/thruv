import { cleanAddress } from "./addressCleaner.js";

const BASE_API = "https://flow-ship.vercel.app/api";

let cachedData = null;

// Fetch sekali saja (cache biar gak berat tiap submit)
const loadData = async () => {
  if (cachedData) return cachedData;

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

  const [provinces, regencies, districts, villages] =
    await Promise.all([
      safeFetch(`${BASE_API}/provinces.json`),
      safeFetch(`${BASE_API}/regencies.json`),
      safeFetch(`${BASE_API}/districts.json`),
      safeFetch(`${BASE_API}/villages.json`),
    ]);

  cachedData = { provinces, regencies, districts, villages };
  return cachedData;
};

const matchByWordBoundary = (text, name) => {
  const regex = new RegExp(`\\b${name.toLowerCase()}\\b`, "i");
  return regex.test(text);
};

export const matchAddress = async (rawAddress) => {
  const cleaned = cleanAddress(rawAddress).toLowerCase();
  const { provinces, regencies, districts, villages } =
    await loadData();

  // ===============================
  // MATCH PROVINCE DIRECT
  // ===============================
  let province = provinces.find((p) =>
    matchByWordBoundary(cleaned, p.name)
  );

  // ===============================
  // MATCH REGENCY
  // ===============================
  const regency = regencies.find((r) =>
    matchByWordBoundary(cleaned, r.name)
  );

  // Kalau province belum ketemu tapi regency ada,
  // ambil province dari relasi ID
  if (!province && regency) {
    province = provinces.find(
      (p) => p.id === regency.province_id
    );
  }

  // ===============================
  // MATCH DISTRICT
  // ===============================
  const district = districts.find((d) =>
    matchByWordBoundary(cleaned, d.name)
  );

  // ===============================
  // MATCH VILLAGE
  // ===============================
  const village = villages.find((v) =>
    matchByWordBoundary(cleaned, v.name)
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
