import { useNavigate } from "react-router-dom";

const ProductCard = ({ image, name, price, link }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer border rounded-3xl bg-gray-100 p-6  shadow hover:shadow-lg transition-all flex flex-col items-center"
    >
      <img src={image} alt={name} className="w-48 h-48 object-cover mb-4 rounded-xl" />
      <h2 className="font-bold text-base">{name}</h2>
      <p className="text-gray-700 text-sm underline">Lihat Selengkapnya  </p>
    </div>
  )
}

export default ProductCard;
