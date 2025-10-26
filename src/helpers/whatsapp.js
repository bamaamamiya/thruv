export const cleanAndValidateWA = (wa) => {
  let cleaned = wa.replace(/\D/g, "");
  if (cleaned.startsWith("0")) cleaned = "62" + cleaned.slice(1);
  if (!cleaned.startsWith("62")) cleaned = "62" + cleaned;
  return /^62[0-9]{9,14}$/.test(cleaned) ? cleaned : null;
};

export const openWhatsappAdmin = (adminWA, productTitle, name, whatsapp, address, paymentMethod) => {
  const message =
    `*PESANAN BARU*\n\n` +
    `*Produk:* ${productTitle}\n` +
    `*Nama:* ${name}\n` +
    `*No. WhatsApp:* ${whatsapp}\n` +
    `*Alamat:* ${address}\n` +
    `*Metode Pembayaran:* ${paymentMethod}\n\n` +
    `Mohon segera diproses, terima kasih`;

  const url = `https://wa.me/${adminWA}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
