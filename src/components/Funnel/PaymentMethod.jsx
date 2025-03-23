const PaymentMethod = ({ selectedMethod, onChange }) => {
  const methods = [
    { id: "COD", label: "Bayar di Tempat", img: "/images/funnel/cod.webp" },
    { id: "Bank Transfer", label: "Bank Transfer", img: "/images/funnel/transfer.webp" },
  ];

  return (
    <div className="mb-4">
      {methods.map((method) => (
        <div
          key={method.id}
          className="flex items-center cursor-pointer border-2 p-4 rounded-md mb-2"
          onClick={() => onChange(method.id)}
        >
          <input
            type="radio"
            name="payment"
            checked={selectedMethod === method.id}
            onChange={() => onChange(method.id)}
            className="mr-2 cursor-pointer"
          />
          <label className="cursor-pointer grid items-center">
            <img src={method.img} alt={method.label} className="w-12 h-12 object-contain" />
            <span className="font-medium">{method.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
