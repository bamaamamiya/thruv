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
  return (
    <div>
      <div className="grid justify-center items-center text-center text-3xl text-redto font-bold p-4">
        <h1>{headLine}</h1>
        <p>{subHeadLine}</p>
      </div>
      <div className="grid justify-center items-center">
        <img src={imgHeadLine} alt="headline" width="640" height="360" />
        <br />
      </div>
      <div className="flex justify-center">
        <section className="space-y-4 p-4">
          <h2 className="text-xl font-bold text-center">
            
						{problemTitle}
          </h2>
					<ul className="space-y-2" style={{ "--emoji": "'🚫'" }}>
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
