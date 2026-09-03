// ==========================================
// META PIXEL TRACKING
// ==========================================

function getPixelIds(pixel) {
  if (!pixel) {
    console.warn("⚠️ Pixel ID kosong");
    return [];
  }

  const pixelIds = Array.isArray(pixel) ? pixel : [pixel];

  return pixelIds.filter(Boolean);
}


// ==========================================
// INITIATE CHECKOUT
// ==========================================

export function trackInitiateCheckout({
  pixel,
  product,
  price,
  quantity = 1,
}) {
  console.log("🟡 INITIATE CHECKOUT DIPANGGIL");

  if (typeof window === "undefined") {
    console.error("❌ Window tidak tersedia");
    return false;
  }

  if (typeof window.fbq !== "function") {
    console.error("❌ window.fbq TIDAK TERSEDIA");
    return false;
  }

  const pixelIds = getPixelIds(pixel);

  if (!pixelIds.length) {
    console.error("❌ Tidak ada Pixel ID");
    return false;
  }

  pixelIds.forEach((pixelId) => {
    console.log("📡 Mengirim InitiateCheckout ke Pixel:", pixelId);

    window.fbq("trackSingle", pixelId, "InitiateCheckout", {
      content_name: product.title,
      content_ids: [product.id || product.title],
      content_type: "product",

      value: Number(price) || 0,
      currency: "IDR",

      num_items: quantity,
    });

    console.log(
      "✅ InitiateCheckout sudah dipanggil untuk Pixel:",
      pixelId
    );
  });

  return true;
}


// ==========================================
// PURCHASE
// ==========================================

export async function trackPurchase({
  pixel,
  product,
  price,
  quantity = 1,
}) {
  console.log("🔥🔥🔥 PURCHASE TRACKING START 🔥🔥🔥");

  if (typeof window === "undefined") {
    console.error("❌ Window tidak tersedia");
    return false;
  }

  console.log("🔍 window.fbq:", window.fbq);
  console.log("🔍 Pixel ID:", pixel);
  console.log("🔍 Product:", product?.title);
  console.log("🔍 Price:", price);

  if (typeof window.fbq !== "function") {
    console.error(
      "❌❌❌ META PIXEL TIDAK TERSEDIA"
    );

    return false;
  }

  const pixelIds = getPixelIds(pixel);

  if (!pixelIds.length) {
    console.error(
      "❌❌❌ PIXEL ID KOSONG"
    );

    return false;
  }

  for (const pixelId of pixelIds) {
    console.log("=================================");
    console.log("📡 MENGIRIM PURCHASE");
    console.log("Pixel ID:", pixelId);
    console.log("Product:", product.title);
    console.log("Value:", Number(price) || 0);
    console.log("=================================");

    window.fbq(
      "trackSingle",
      pixelId,
      "Purchase",
      {
        content_name: product.title,
        content_ids: [product.id || product.title],
        content_type: "product",

        value: Number(price) || 0,
        currency: "IDR",

        num_items: quantity,
      }
    );

    console.log(
      "✅ fbq Purchase SUDAH DIPANGGIL:",
      pixelId
    );
  }

  console.log(
    "🟢 SEMUA PURCHASE SUDAH DITEMBAKKAN KE FBQ"
  );

  return true;
}