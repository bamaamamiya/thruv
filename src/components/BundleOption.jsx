import React from "react";

const BundleOption = ({
  title,
  description,
  isActive,
  onClick,
  isRecommended,
  price,
  isPrice,
}) => {
  const discound = price && isPrice ? price - isPrice : null;

  // Fungsi untuk memformat angka dengan pemisah ribuan
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className={`flex border rounded-lg p-6 cursor-pointer justify-between items-center 
      ${isActive ? "border-green-500 bg-green-50" : "border-gray-300"} 
      hover:shadow-md transition relative`}>
      <div
        onClick={onClick}
        // className={`border rounded-lg p-4 cursor-pointer grid items-center 
        // ${isActive ? "border-green-500 bg-green-50" : "border-gray-300"} 
        // hover:shadow-md transition relative`}
      >
        {/* Badge Rekomendasi */}
        {isRecommended && (
          <span className="absolute -right-1 top-1 rotate-12 bg-redto text-white text-sm font-bold px-2 py-1 rounded">
            Populer
          </span>
        )}
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>

        {/* Menampilkan informasi diskon jika ada */}

        {discound !== null ? <p className="text-sm">Hemat {formatCurrency(discound)}</p> : <p></p>
        }
      </div>
        <div className="text-end">
          <p className="text-lg font-bold text-greento "> {formatCurrency(isPrice)}</p>
          <p className="line-through text-xs">{formatCurrency(price)}</p>
        </div>
    </div>
  );
};

export default BundleOption;
