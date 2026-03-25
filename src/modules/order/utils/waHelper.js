// utils/waHelper.js
export const cleanAndValidateWA = (wa) => {
  let cleaned = wa.replace(/\D/g, "");
  if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
  if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
  return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
};