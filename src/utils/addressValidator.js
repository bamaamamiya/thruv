export const validateAddress = (address) => {
  const value = address?.trim() || "";

  // ==========================================
  // ❌ EMPTY
  // ==========================================

  if (!value) {
    return {
      valid: false,
      needsReview: false,
      reason:
        "Alamat masih kosong. Mohon isi alamat lengkap ya kak 🙏",
    };
  }

  // ==========================================
  // KEYWORD DETECTION
  // ==========================================

  const hasJalan = /\b(Jl\.?|Jalan|Gang|Gg\.?)\b/i.test(value);

  const hasNumber =
    /\b(No\.?|Nomor)\s*\d+[A-Z]?\b/i.test(value) ||
    /\b\d+[A-Z]?\b/i.test(value);

  const hasDesa =
    /\b(Desa|Ds\.?|Kel\.?|Kelurahan)\b/i.test(value);

  const hasRTRW =
    /\bRT\s*\d{1,3}\b/i.test(value) ||
    /\bRW\s*\d{1,3}\b/i.test(value);

  const hasPerumahan =
    /\b(Perum|Perumahan|Komplek|Kompleks|Cluster|Perumahan)\b/i.test(
      value,
    );

  const hasTower =
    /\b(Tower|Apartemen|Apartment|Unit|Lantai|Lt\.?)\b/i.test(
      value,
    );

  const hasKecamatan =
    /\b(Kecamatan|Kec\.?)\b/i.test(value);

  const hasKabKota =
    /\b(Kabupaten|Kab\.?|Kota)\b/i.test(value);

  const hasKodePos = /\b\d{5}\b/.test(value);

  // ==========================================
  // BASIC LOCATION WORDS
  // ==========================================

  const locationWords =
    /\b(Jakarta|Bandung|Surabaya|Medan|Semarang|Bekasi|Depok|Bogor|Tangerang|Malang|Yogyakarta|Jogja|Makassar|Palembang|Denpasar|Batam|Pekanbaru|Padang|Bali)\b/i.test(
      value,
    );

  // ==========================================
  // ❌ TOO SHORT
  // ==========================================

  if (value.length < 20) {
    return {
      valid: false,
      needsReview: false,
      reason:
        "Alamat terlalu singkat. Mohon lengkapi alamat ya kak 🙏\n\n" +
        "Contoh:\n" +
        "Jl. Mawar No. 10, RT 02/RW 03, " +
        "Kecamatan Sukajadi, Kota Bandung, Jawa Barat.",
    };
  }

  // ==========================================
  // ✅ CLEAR — GOOD ADDRESS
  // ==========================================

  if (
    (hasJalan && hasNumber && (hasKabKota || locationWords)) ||
    (hasRTRW && (hasKabKota || locationWords)) ||
    (hasDesa && hasRTRW && (hasKabKota || locationWords)) ||
    (hasPerumahan && hasNumber) ||
    (hasTower && hasNumber)
  ) {
    return {
      valid: true,
      needsReview: false,
      reason: "Alamat lengkap",
    };
  }

  // ==========================================
  // ⚠️ LONG ADDRESS
  // ==========================================

  if (value.length >= 40) {
    return {
      valid: true,
      needsReview: true,
      reason:
        "Alamat sudah cukup panjang, tapi mohon cek kembali " +
        "nama jalan, nomor rumah, kecamatan, dan kota/provinsi.",
    };
  }

  // ==========================================
  // ⚠️ MEDIUM ADDRESS
  // ==========================================

  return {
    valid: true,
    needsReview: true,
    reason:
      "Mohon lengkapi alamat dengan nama jalan, nomor rumah, " +
      "RT/RW, kecamatan, dan kota/provinsi.",
  };
};