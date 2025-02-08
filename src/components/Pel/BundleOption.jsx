import React from "react";

const BundleOption = ({ title, description, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 border rounded-lg cursor-pointer ${
        isActive ? "border-green-500 bg-green-100" : ""
      }`}
    >
      <p className="font-bold">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default BundleOption;
