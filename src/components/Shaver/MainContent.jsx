import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import Form from "./Form";
import Headline from "./Headline";
import CountdownTimer from "../set/CountdownTimer";
import Sticky from "../set/Sticky";

const MainContent = () => {
  return (
    <div className="m-4 space-y-2">
      <Headline />
      <div className="grid justify-center items-center">
        <img
          src="/images/diskonspesial.webp"
          alt="promo"
          width="640"
          height="360"
        />
        <p className="text-3xl text-center font-extrabold">
          Promo Diskon Spesial akan berakhir dalam :{" "}
        </p>
        <CountdownTimer hours={0} minutes={9} seconds={0} />
        <br />
        <img src="/images/2.webp" alt="cod" width="640" height="360" />
      </div>

      <div>
        <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
          <FontAwesomeIcon icon={faArrowDown} />
          <FontAwesomeIcon icon={faArrowDown} />
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
        <Form />
      </div>

      <div className="grid justify-center items-center ">
        <img
          src="/images/testi (1).webp"
          alt="testi1"
          width="640"
          height="360"
        />
        <img
          src="/images/testi (2).webp"
          alt="testi2"
          width="640"
          height="360"
        />
        <img
          src="/images/testi (3).webp"
          alt="testi3"
          width="640"
          height="360"
        />

        <img src="/images/fotter.webp" alt="footer" width="640" height="360" />
        <img src="/images/fotter2.webp" alt="footer" width="640" height="360" />
      </div>

      <Sticky />
    </div>
  );
};

export default MainContent;
