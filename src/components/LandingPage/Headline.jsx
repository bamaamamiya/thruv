import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";



const HeadLine = ({imgHeadLine , headLine , subHeadLine ,rating , terjual}) => {
  return (
    <div>
      <div className="grid justify-center items-center">
        <img
          src={imgHeadLine}
          alt="headline"
          width="640"
          height="360"
        />
        <div className="grid justify-center items-center text-center text-5xl text-redto font-bold">
					<div className="grid">
          <h1>{headLine}</h1>
					</div>
          <br />

          <div className="text-3xl">
            <p>{subHeadLine}</p>
          </div>
          <br />

          <div className="grid text-yellto text-2xl text-center">
            <div className="flex justify-center items-center">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
            <br />
            <div className="text-black">
              <p>{rating} Rating</p>
              <p>Terjual {terjual} +</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="grid justify-center items-center text-center">
        <h1 className="font-bold text-2xl m-2">
          Diskon <span className="text-redto font-bold">50%</span> Khusus Untuk
          Hari Ini
        </h1>
        <br />
        <p className="font-bold text-2xl">Promo Akan Berakhir Dalam : </p>
        <br />
        <CountdownTimer hours={0} minutes={9} seconds={0} />
        <br />
      </div>
      <Garansi />
      <br />
    </div>
  );
};

export default HeadLine;
