import { cleanAddress } from "../../utils/addressCleaner";
import { validateAddress } from "../../utils/addressValidator";
import { detectProvinceFast } from "../../utils/detectProvinceFast";

export function cleanAndValidateWA(wa) {
  let cleaned = wa.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }

  if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned;
  }

  return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
}

export function validateOrderInput({
  name,
  whatsapp,
  address,
  checkout,
}) {
  // =========================
  // CUSTOMER DATA
  // =========================

  if (!name?.trim()) {
    return {
      valid: false,
      field: "name",
      reason: "Silakan isi nama Anda.",
    };
  }

  if (!whatsapp?.trim()) {
    return {
      valid: false,
      field: "whatsapp",
      reason: "Silakan isi nomor WhatsApp aktif.",
    };
  }

  if (!address?.trim()) {
    return {
      valid: false,
      field: "address",
      reason:
        "Silakan isi alamat lengkap beserta provinsi/kota.",
    };
  }

  // =========================
  // WHATSAPP
  // =========================

  const cleanedWA = cleanAndValidateWA(whatsapp);

  if (!cleanedWA) {
    return {
      valid: false,
      field: "whatsapp",
      reason: "Nomor WhatsApp tidak valid.",
    };
  }

  // =========================
  // ADDRESS
  // =========================

  const addressCleaned = cleanAddress(address);

  const validation = validateAddress(addressCleaned);

  if (!validation.valid) {
    return {
      valid: false,
      field: "address",
      reason: validation.reason,
    };
  }

  // =========================
  // PROVINCE
  // =========================

  const provinceName = detectProvinceFast(addressCleaned);

  if (checkout.ongkir && !provinceName) {
    return {
      valid: false,
      field: "address",
      reason:
        "Mohon isi provinsi atau kota ya kak 🙏 Contoh: Jakarta, Bandung, atau Surabaya.",
    };
  }

  // =========================
  // SUCCESS
  // =========================

  return {
    valid: true,
    cleanedWA,
    addressCleaned,
    provinceName,
  };
}