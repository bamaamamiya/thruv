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
        loading="lazy"
        decoding="async"
      />
    ))}
  </div>
);

const Content = ({
  mainImage,
  secondText,
  solutions,
  solutionTitle,
  productImages,
  testimonies,
}) => {
  return (
    <div>
      {/* Bagian Intro */}
      <div className="grid justify-center items-center gap-6">
        <img
          className="flex justify-center items-center"
          src={mainImage}
          alt="main"
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex justify-center">
        <section className="space-y-4 p-4">
          <h2 className="text-xl font-bold text-center">{solutionTitle}</h2>
          <br />
          <ul className="space-y-2" style={{ "--emoji": "'✅'" }}>
            {solutions.map((item, idx) => (
              <li
                key={idx}
                className="relative pl-6 before:content-[var(--emoji)] before:absolute before:left-0 before:top-0.5"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Produk */}
      <ImageSection images={productImages} altPrefix="product" />

      {/* Testimoni */}
      <h1 className="font-bold text-center text-4xl mt-2">Apa Kata Pelanggan Kami?</h1>
      <br />
      <ImageSection images={testimonies} altPrefix="testimoni" />
      <br />
    </div>
  );
};

export default Content;
