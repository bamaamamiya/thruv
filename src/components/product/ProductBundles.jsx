"use client";
function formatRupiah(number = 0) {
  const value = Number(number) || 0;

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace(".0", "")}jt`;
  }

  if (value >= 1000) {
    return `${Math.round(value / 1000)}rb`;
  }

  return value.toString();
}

function getNormalPrice(sellingPrice, discountRate = 0.5) {
  const price = Number(sellingPrice) || 0;

  if (discountRate >= 1 || discountRate < 0) {
    throw new Error("Discount rate harus antara 0 dan 1");
  }

  return Math.round(price / (1 - discountRate));
}
function getDiscountPercent(price, comparePrice) {
  if (!comparePrice) return 0;

  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export default function ProductBundles({
  bundles = [],
  selectedBundle,
  setSelectedBundle,
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {bundles.map((bundle) => {
        const active = selectedBundle?.id === bundle.id;
        const price = bundle.pricing?.price ?? 0;
        const comparePrice = bundle.comparePrice ?? 0;
        const discount = getDiscountPercent(price, comparePrice);
        return (
          <button
            key={bundle.id}
            onClick={() => setSelectedBundle(bundle)}
            className={`relative rounded-lg border-2 p-3 transition-all duration-200 flex flex-col items-center text-center min-h-[145px] ${
              active ? "border-black bg-gray-50" : "border-gray-200"
            }`}
          >
            {/* BADGE */}
            {bundle.badge && (
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-[3px] rounded-md text-[10px] font-medium whitespace-nowrap mt-2 ${
                  active ? "bg-black text-white" : "bg-black text-white"
                }`}
              >
                {bundle.badge}
              </div>
            )}

            {/* RADIO */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-4 mb-2 ${
                active ? "border-black" : "border-gray-300"
              }`}
            >
              {active && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-sm leading-tight min-h-[34px] flex items-center">
              {bundle.title}
            </h3>

            {/* SUBTITLE */}
            <p className="text-[10px] text-gray-500 mt-1 leading-tight min-h-[24px]">
              {discount > 0 ? `Hemat ${discount}%` : ""}
            </p>

            {/* PRICE */}
            <div className="mt-2">
              <p className="font-bold text-sm leading-none">
                {formatRupiah(bundle.pricing?.price ?? 0)}
              </p>

              <p className="text-[10px] text-gray-400 line-through mt-1">
                {formatRupiah(comparePrice)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
