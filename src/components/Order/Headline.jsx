import React from "react";

const HeadLine = ({
  imgHeadLine,
  headLine,
  subHeadLine,
  rating,
  terjual,
  problems,
  problemTitle,
}) => {
  const ImageSection = ({ images, altPrefix = "image" }) => (
    <div className="flex flex-col items-center space-y-4">
  {images.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`${altPrefix}-${index + 1}`}
      width="640"
      height="360"
      loading="lazy"
      decoding="async"
      className="rounded-lg shadow-md"
    />
  ))}
</div>

  );
  return (
    <div>
      <div className="grid justify-center items-center text-center text-2xl text-redto font-bold p-4">
        <h1>{headLine}</h1>
        <br />
        <p className="text-xl">{subHeadLine}</p>
      </div>
      <div className="grid justify-center items-center">
        <img src={imgHeadLine} alt="headline" width="640" height="360" loading="eager" decoding="async" />
        <br />
      </div>
      <div className="flex justify-center">
        <section className="space-y-4 p-4">
          <h2 className="text-xl font-bold text-center">{problemTitle}</h2>
          <ul className="space-y-2" style={{ "--emoji": "'🚨'" }}>
            {problems.map((item, idx) => (
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
    </div>
  );
};

export default HeadLine;
