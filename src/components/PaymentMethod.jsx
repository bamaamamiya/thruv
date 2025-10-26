const PaymentMethod = ({ methods, selected, onSelect, discountTransfer }) => {
  return (
    <div className="mb-4">
      {methods.map((method) => (
        <div
          key={method}
          className="flex items-center cursor-pointer border-2 p-4 rounded-md mb-2"
          onClick={() => onSelect(method)}
        >
          <input
            type="radio"
            name="payment"
            value={method}
            checked={selected === method}
            onChange={() => onSelect(method)}
            className="mr-2"
          />
          <label className="grid items-center relative cursor-pointer">
            <img
              src={`/images/funnel/${
                method === "COD" ? "cod" : "transfer"
              }.webp`}
              alt={method}
              className="w-12 h-12 object-contain"
            />
            <span className="font-medium -mt-2">
              {method === "COD" ? "Bayar di Tempat" : "Bank Transfer"}
            </span>
            {method === "Bank Transfer" && discountTransfer && (
              <span className="inline-block bg-redto/10 text-redto text-[11px] font-bold px-3 py-[2px] rounded-md shadow-sm border border-redto/70">
                Potongan ONGKIR 10RB !!!
              </span>
            )}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
