import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "../set/CountdownTimer";
import Funnel from "../FunnelAtc";
import Faqs from '../set/Faqs'

const Footer = ({ promoImages, pixelId, produkBaru, footerImages ,faqs}) => {
  return (
    <div>
      {/* PROMO SECTION */}
      <div className="grid justify-center items-center">
        {promoImages.map((img, i) => (
          <img key={i} src={img} alt={`promo-${i}`} width="640" height="360" />
        ))}
      </div>

      {/* COUNTDOWN */}
      <div className="p-4 bg-yellto text-center">
        <p className="font-bold">Promo Akan Berakhir Dalam : </p>
        <CountdownTimer hours={0} minutes={9} seconds={0} />
      </div>

      {/* FORM TITLE + ARROW */}
      <br />
      <h1 className="text-center font-bold p-2 text-2xl" id="formulir">
        Isi Formulir untuk melakukan pemesanan
      </h1>
      <br />
      <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowDown} />
      </div>

      {/* URGENCY */}
      <div className="text-center flex justify-center items-center gap-2 bg-greentoo/20 p-2">
        <span className="relative flex h-3 w-3 items-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-greento opacity-95"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-greento"></span>
        </span>
        <p className="text-sm">
          73 orang sekarang sedang ingin mengambil promo!
        </p>
      </div>

      {/* FORM FUNNEL */}
      <div id="form">
        <Funnel pixel={pixelId} product={produkBaru} />
      </div>

				{/* FAQ */}
				<div>
        <Faqs faqs={faqs} />
      </div>


      {/* FOOTER IMAGE */}
      <br />
      <div className="grid justify-center items-center">
        {footerImages.map((img, i) => (
          <img key={i} src={img} alt={`footer-${i}`} width="640" height="360" />
        ))}
      </div>
      <br />

    </div>
  );
};

export default Footer;
