export const validateAddress = (address) => {
  if (!address || address.trim().length === 0) {
    return { valid: false, needsReview: false, reason: "Alamat kosong" }; // ❌ Hard Reject
  }

  // Keyword detection
  const hasJalan = /\b(Jl\.?|Jalan|Gang|Gg\.?)\b/i.test(address);
  const hasNumber =
    /\b(No\.?|Nomor)\s*\d+/i.test(address) || /\d+[A-Z]?$/.test(address);
  const hasDesa = /\b(Desa|Kel(\.|urahan)?|Ds)\b/i.test(address);
  const hasRTRW = /(RT|Rw)\s*\d+/i.test(address);
  const hasPerumahan = /\b(Perum(ahan)?|Komp(leks)?)\b/i.test(address);
  const hasTower = /\b(Tower|Apartemen|Unit|Lantai)\b/i.test(address);
  const hasKecamatan = /\b(Kecamatan|Kec\.?)\b/i.test(address);
  const hasKabKota = /\b(Kabupaten|Kab\.?|Kota)\b/i.test(address);
  const hasKodePos = /\b\d{5}\b/.test(address);

  let valid = false;
  let needsReview = false;
  let reason = "";

  // ✅ Clear: minimal info lengkap
  if (
    (hasRTRW && hasKabKota && hasKodePos) ||
    (hasJalan && hasKabKota && hasKodePos) ||
    (hasDesa && hasRTRW && hasKabKota) ||
    (hasPerumahan && hasNumber) ||
    (hasTower && hasNumber)
  ) {
    valid = true;
    needsReview = false; // ✅ cukup lengkap
    reason = "Alamat lengkap";
  } 
  // ⚠️ Soft Warning: alamat panjang tapi kurang keyword
  else if (address.length > 40) {
    valid = true;
    needsReview = true;
    reason = "Alamat panjang, tapi cek kembali detailnya";
  } 
  // ❌ Hard Reject: alamat terlalu pendek
  else if (address.length < 20) {
    valid = false;
    needsReview = false;
    reason = "Alamat terlalu singkat";
  } 
  // ⚠️ Soft Warning fallback: valid tapi kurang keyword
  else {
    valid = true;
    needsReview = true;
    reason = "Mohon lengkapi alamat dengan nama jalan, nomor rumah, RT/RW atau detail perumahan";
  }

  return {
    valid,
    needsReview,
    reason,
  };
};
