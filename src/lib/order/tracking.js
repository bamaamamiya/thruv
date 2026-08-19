import { sha256 } from "../../utils/hash";

function getPixelIds(pixel) {
  if (!pixel) return [];

  return (Array.isArray(pixel) ? pixel : [pixel]).filter(Boolean);
}

export function trackInitiateCheckout({ pixel, product, price, quantity = 1 }) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;

  const pixelIds = getPixelIds(pixel);

  pixelIds.forEach((pixelId) => {
    window.fbq("trackSingle", pixelId, "InitiateCheckout", {
      content_name: product.title,
      content_ids: [product.id || product.title],
      content_type: "product",

      value: price || 0,
      currency: "IDR",

      num_items: quantity,
    });

    console.log("Meta InitiateCheckout:", pixelId);
  });
}

export async function trackPurchase({
  pixel,
  product,
  price,
  whatsapp,
  quantity = 1,
}) {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;

  const hashedPhone = await sha256(whatsapp);

  const pixelIds = getPixelIds(pixel);

  pixelIds.forEach((pixelId) => {
    window.fbq("trackSingle", pixelId, "Purchase", {
      content_name: product.title,
      content_ids: [product.id || product.title],
      content_type: "product",

      ph: hashedPhone,

      value: price || 0,
      currency: "IDR",

      num_items: quantity,
    });

    console.log("Meta Purchase:", pixelId);
  });
}
