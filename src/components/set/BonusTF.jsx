import React from "react";

const BonusTF = ({ valueStack, hargaPromo }) => {
  const totalValue = valueStack.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white p-6 max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center capitalize">
        Semua ini{" "}
        <span className="text-redto font-semibold ">Khusus untuk kamu</span>{" "}
        {/* yang pilih <span className="text-redto italic">Transfer</span> */}
      </h2>

      <div className="space-y-3">
        {valueStack.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center border border-redto p-3 rounded-lg text-sm"
          >
            <span className="text-gray-950 text-xs">{item.item}</span>
            <span className="text-black font-bold">
              + Rp{item.value.toLocaleString("id-ID")}
            </span>
          </div>
        ))}

        <div className=" pt-4 mt-4 text-center">
          <p className="text-gray-500 text-xs mb-1 ">Total Nilai Produk + Bonus Sebenarnya :</p>
          <p className="text-xl font-bold text-gray-800 mb-2 line-through">
            Rp{totalValue.toLocaleString("id-ID")}
          </p>
          <p className=" text-sm mb-1">Promo cuma untuk kamu :</p>
          <p className="text-5xl font-bold text-redto">
            Rp{hargaPromo.toLocaleString("id-ID")}
          </p>
          <p className="mt-4 text-xs italic ">
            Sayangnya, untuk metode COD tidak tersedia bonus & potongan ongkir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BonusTF;
