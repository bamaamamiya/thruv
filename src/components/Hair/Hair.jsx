import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import Floting from "../Pel/Floting";
import Count from "../Count";
import Garansi from "../set/Garansi";
import Footer from "../Footer";
const Hair = () => {
  return (
    <div className="m-2">
      <div className="grid justify-center items-center">
        <img
          src="./images/hair/2.jpg"
          alt="headline"
          width="640"
          height="360"
        />
				<br/>
				<h1 className="text-center text-3xl ">Rambut kamu kering, bercabang, kusam, susah diatur?</h1>
				<br/>
				<h2 className="text-center text-2xl">Tanpa Ribet! Cukup oleskan 5 menit langsung sehat & glowing</h2>
        <img
          src="./images/hair/7.jpg"
          alt="headline"
          width="640"
          height="360"
        />
        <Count />
        <Garansi />
        <br />
        <img
          src="./images/hair/9.png"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/10.png"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/11.png"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/8.png"
          alt="headline"
          width="640"
          height="360"
        />
      </div>

      <img
        src="./images/diskonspesial.webp"
        alt="headline"
        width="640"
        height="360"
      />
      <img
        src="./images/hair/offerhair.png"
        alt="headline"
        width="640"
        height="360"
      />
      <br />
      <div className=" bg-yellto text-center">
        <Count />
      </div>

      <br />
      <h1 className="text-center font-bold p-2 text-2xl" id="formulir">
        Isi Formulir untuk melakukan pemesanan
      </h1>
      <br />
      <br />
      <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <div id="form">
        <Form />
      </div>
			<Footer/>

      <Floting />
    </div>
  );
};

export default Hair;
