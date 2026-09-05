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

export function trackPurchase({
  pixel,
  product,
  price,
  quantity = 1,
}) {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
      return resolve(false);
    }

    const pixelIds = getPixelIds(pixel);
    if (!pixelIds.length) return resolve(false);

    let finished = 0;
    let resolved = false;

    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve(true);
    };

    const timer = setTimeout(finish, 1200);

    pixelIds.forEach((pixelId) => {
      window.fbq("trackSingle", pixelId, "Purchase", {
        content_name: product.title,
        content_ids: [product.id || product.title],
        content_type: "product",
        value: Number(price) || 0,
        currency: "IDR",
        num_items: quantity,

        event_callback: () => {
          finished++;

          if (finished === pixelIds.length) {
            clearTimeout(timer);
            finish();
          }
        },
      });
    });
  });
}