import React from "react";

const ValueStack = ({ values, totalValue, promoPrice }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center text-red-600">
        Apa Saja Yang Akan Kamu Dapat !!!
      </h2>

      <div className="space-y-3">
        {values.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-2"
          >
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="text-gray-600 font-medium">
              Rp {item.value.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>

      {/* Total Value */}
      <div className="border-t-2 border-gray-300 pt-4">
        <h3 className="text-xl font-bold text-gray-800 text-center">
          Total Value:{" "}
          <span className="text-red-600">
            Rp {totalValue.toLocaleString("id-ID")}
          </span>
        </h3>
      </div>

      {/* Promo Price */}
      <div className="bg-red-600 text-white text-center py-4 rounded-xl">
        <p className="text-lg">Tapi kamu tidak perlu bayar segitu!</p>
        <p className="text-3xl font-bold">
          Cukup Rp {promoPrice.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default ValueStack;
