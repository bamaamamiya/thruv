import React from "react";

const BundleOption = ({ title, description, isActive, onClick, isRecommended }) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer grid items-center 
        ${isActive ? "border-green-500 bg-green-50" : "border-gray-300"} 
        hover:shadow-md transition relative`}
    >
      {/* Badge Rekomendasi */}
      {isRecommended && (
        <span className="absolute right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
          Pembelian Terbanyak
        </span>
      )}
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default BundleOption;
