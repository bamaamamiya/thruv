import React from "react";

const ImageSection = ({ images, altPrefix = "image" }) => (
  <div className="grid justify-center items-center space-y-4">
    {images.map((src, index) => (
      <img
				className="space-y-2 flex justify-center"
        key={index}
        src={src}
        alt={`${altPrefix}-${index + 1}`}
        width="640"
        height="360"
      />
    ))}
  </div>
);


const Content = ({
  mainImage,
  introText,
	secondText,
	solution,
  secondImage,
  productImages,
  testimonies,
}) => {
  return (
		<div>
		{/* Bagian Intro */}
		<div className="grid justify-center items-center gap-6">
			<img className="flex justify-center items-center" src={mainImage} alt="main" width="640" height="360" />
			<p className="uppercase text-center font-bold text-3xl m-2">
				{introText}
			</p>
			<p className="uppercase text-center font-bold text-3xl m-2">
				{secondText}
			</p>
		</div>

		{/* Gambar ke-2 */}
		<div className="grid justify-center items-center text-center">
			<img className="flex justify-center items-center" src={secondImage} alt="second" width="640" height="360" />
			<p className="p-4">{solution}</p>
		</div>

		{/* Produk */}
		<ImageSection images={productImages} altPrefix="product" />

		{/* Testimoni */}
		<h1 className="font-bold text-center text-4xl mt-2">TESTIMONI</h1>
		<ImageSection images={testimonies} altPrefix="testimoni" />

	</div>
  );
};

export default Content;
