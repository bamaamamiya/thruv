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
import Rating from "../Rating";
const Hair = () => {
  return (
    <div className="m-2">
      <div className="grid justify-center items-center">
				<div className="flex justify-center">
        <img
          src="./images/hair/2.webp"
          alt="headline"
          width="640"
          height="360"
					/>
					</div>
        <br />
        <h1 className="text-center text-3xl font-bold text-greendo">
          Rambut kamu kering, bercabang, kusam, susah diatur?
        </h1>
        <br />
        <br />
        <br />
        <h2 className="text-center text-2xl font-semibold text-greendoo">
          Tanpa Ribet! Cukup oleskan 5 menit langsung sehat & glowing
        </h2>
        <br />
        <br />
        <Rating rating="4.8 Rating" terjual="1.800 +" />
        <br />
        <br />
        <br />
        <Count />
        <Garansi />
        <br />

				<div className="grid justify-center">

        <img
          src="./images/hair/manfaat.webp"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/4.webp"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/9.webp"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/10.webp"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/11.webp"
          alt="headline"
          width="640"
          height="360"
        />
        <img
          src="./images/hair/8.webp"
          alt="headline"
          width="640"
          height="360"
        />
				</div>

        <br />
        <div className="grid justify-center items-center space-y-2">
          <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
          <br />
          <br />
          <img
            src="images/hair/testi.webp"
            alt="testimoni"
            width="640"
            height="360"
          />
          <img
            src="images/hair/testi2.webp"
            alt="testimoni"
            width="640"
            height="360"
          />
          <img
            src="images/hair/testi3.webp"
            alt="testimoni"
            width="640"
            height="360"
          />
          <br />
          <br />
          <br />
        <img
          src="./images/diskonspesial.webp"
          alt="headline"
          width="640"
          height="360"
					/>
        <img
          src="./images/hair/offerhair.webp"
          alt="headline"
          width="640"
          height="360"
					/>
					</div>
      </div>
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
      <Footer />

      <Floting />
    </div>
  );
};

export default Hair;
