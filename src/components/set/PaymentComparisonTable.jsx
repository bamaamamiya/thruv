// components/PaymentComparison.jsx
import React from "react";

const PaymentComparison = ({
  bonusItem,
  cashback,
  priorityShipping,
  digitalGuide,
  guarantee,
  codFee,
}) => {
  const features = [
    { label: bonusItem, transfer: true, cod: false },
    { label: cashback, transfer: true, cod: false },
    { label: priorityShipping, transfer: true, cod: "standard" },
    // { label: digitalGuide, transfer: true, cod: false },
    { label: guarantee, transfer: true, cod: false },
    { label: codFee, transfer: false, cod: true },
  ];

  const renderStatus = (val, isTransfer) => {
    if (val === true)
      return <span className="text-green-600 font-semibold">✅ Ya</span>;
    if (val === false)
      return <span className="text-red-500 font-semibold">❌ Tidak</span>;
    // untuk kondisi seperti "standard"
    return <span className="text-yellow-500 font-medium">⏱️ {val}</span>;
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-center mb-4 text-gray-800">
        Kenapa Banyak Pelanggan Pilih{" "}
        <span className="text-gray-800">Transfer?</span>
      </h2>

      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
        <div></div>
        <div className="text-center text-green-700 font-bold">💳 Transfer</div>
        <div className="text-center text-red-600 font-bold">🚚 COD</div>
      </div>

      <div className="mt-2 divide-y divide-gray-200">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 gap-4 py-3 items-center text-sm"
          >
            <div className="text-gray-700">{item.label}</div>
            <div className="text-center">
              {renderStatus(item.transfer, true)}
            </div>
            <div className="text-center">{renderStatus(item.cod, false)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg p-4 text-center font-semibold">
        🟩 <span className="font-bold">Rekomendasi:</span> Gunakan{" "}
        <span className="underline">Transfer</span> untuk manfaat maksimal &
        hemat biaya!
      </div>
    </div>
  );
};

export default PaymentComparison;
