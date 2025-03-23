const InputField = ({ type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
    />
  </div>
);

export default InputField;
