import React from "react";

const ValueStack = ({ values, totalValue, promoPrice, bonuses }) => {
  return (
    <section className="max-w-2xl mx-auto bg-white rounded-2xl p-6 mt-10 space-y-6">
      {/* Headline */}
      <h2 className="text-3xl font-extrabold text-center text-gray-900">
        🎯 Lihat Apa Saja yang Kamu Dapat <br />
        <span className="text-red-600">(Nilainya Beneran Gede!)</span>
      </h2>

      {/* Value List */}
      <div className="space-y-3">
        {values.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-2"
          >
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
            <p className="text-gray-600 font-medium">
              Rp {item.value.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>

      {/* Bonus Section (Optional) */}
      {bonuses && bonuses.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 space-y-3">
          <h3 className="text-lg font-bold text-yellow-700">
            🎁 BONUS SPESIAL (Gratis)
          </h3>
          {bonuses.map((bonus, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-1"
            >
              <p className="text-gray-800 font-medium">{bonus.title}</p>
              <p className="text-green-600 font-semibold">
                Rp {bonus.value.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Total Value */}
      <div className="border-t-2 border-gray-300 pt-4">
        <h3 className="text-xl font-bold text-gray-800 text-center">
          Kalau dijumlah, semua ini bernilai{" "}
          <span className="text-red-600">
            Rp {totalValue.toLocaleString("id-ID")}
          </span>
        </h3>
        <p className="text-center text-gray-500 mt-1 text-sm">
          (Itu harga asli kalau dibeli terpisah)
        </p>
      </div>

      {/* Promo Price */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-6 rounded-xl shadow-xl space-y-3 ">
        <p className="text-xl font-medium p-2">
          Bayangkan dapet semua ini, tapi cukup keluar…
        </p>
        <p className="text-2xl font-semibold">Hari ini hanya</p>
        <p className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Rp {promoPrice.toLocaleString("id-ID")}
        </p>
        <p className="text-sm italic text-red-100 font-light">
          *Harga naik 20% bulan depan atau setelah kuota habis
        </p>
      </div>
    </section>
  );
};

export default ValueStack;
