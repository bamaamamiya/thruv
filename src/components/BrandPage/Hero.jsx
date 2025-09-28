import React, { useState } from "react";

// Hero Component
function Hero({
  image,
  title,
  description,
  price,
  oldPrice,
  features,
  details,
	exclusive
}) {
  const [selectedImage, setSelectedImage] = useState(image[0]);

	const handleClick = () => {
		document.getElementById("formulir")?.scrollIntoView({behavior: "smooth"});
	}

  return (
    <section className="flex flex-col md:flex-row gap-6 px-6 py-15 max-w-6xl mx-auto">
      {/* Image */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-sm aspect-square overflow-hidden rounded-lg shadow-md mb-4">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3">
          {image.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                selectedImage === img ? "border-green-500" : "border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
				<h2 className="text-sm text-blue-600 font-semibold mb-1">Exclusive {exclusive}</h2>
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <div className="flex text-sm space-x-2 text-gray-600">
          <p className="text-yellow-500">⭐ 4.9</p>
          <p>2.7k+ Reviews</p>
          <p>9.8k+ Sold</p>
        </div>
        <p className="text-gray-500 mb-3 mt-3">{description}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-red-600 text-2xl font-bold">
            Rp{price.toLocaleString("id-ID")}
          </span>
          <span className="text-gray-400 line-through">
            Rp{oldPrice.toLocaleString("id-ID")}
          </span>
        </div>

        <ul className="space-y-2 mb-5">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-700">
              ✔ {feature}
            </li>
          ))}
        </ul>

        <button onClick={handleClick} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold mb-6">
          Beli Sekarang
        </button>

        {/* Detail Produk */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-3">Detail Produk</h2>
          <div className="grid gap-2">
            {Object.entries(details).map(([label, value], index) => (
              <div
                key={index}
                className="flex justify-between items-center border-2 rounded-md px-3 py-2 bg-white"
              >
                <p className="text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
