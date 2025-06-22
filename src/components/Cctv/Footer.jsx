import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "../set/CountdownTimer";
import Funnel from "../FunnelPurchase";
import Faqs from "../set/Faqs";
import { useEffect, useRef, useState } from "react";
import PriceDisplay from "../set/PriceDisplay"

const Footer = ({ pixelId, produkBaru, footerImages, faqs }) => {
	const normalPrice = 249000;  // harga normal
  const promoPrice = 129000;    // harga promo
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(normalPrice);
  const promoRef = useRef(null);

	useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (promoRef.current) {
      observer.observe(promoRef.current);
    }

    return () => {
      if (promoRef.current) {
        observer.unobserve(promoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && currentValue > promoPrice) {
      const step = (normalPrice - promoPrice) / 50; // adjust speed
      const interval = setInterval(() => {
        setCurrentValue((prev) => {
          if (prev - step <= promoPrice) {
            clearInterval(interval);
            return promoPrice;
          }
          return prev - step;
        });
      }, 30);
    }
  }, [isVisible]);
  return (
    <div>
      <div className="space-y-2">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            ⚠Promo 50% Hanya Untuk 3 Orang Pemesanan Pertama⚠
          </h1>
          <br />
          <p className="text-lg">
            Harga Normal <span className="line-through">Rp.249.000</span>
          </p>
          <p className="text-lg">Harga Promo</p>
        </div>
        {/* <div className="text-center text-4xl font-bold">
          <h1>Cuma 149rb</h1>
          <h1>🔥Gratis Ongkir 🔥</h1>
        </div> */}
				<div className="text-center text-5xl font-bold" ref={promoRef}>
        <h1 className="text-redto">Rp {Math.floor(currentValue).toLocaleString("id-ID")}</h1>
      </div>
        <br />
        <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
          <p className="bg-redto text-white text-sm px-3 flex items-center h-full w-1/3">
            Sisa Promo: 1
          </p>
        </div>
      </div>
      {/* PROMO SECTION */}
      {/* <div className="grid justify-center items-center">
        {promoImages.map((img, i) => (
          <img key={i} src={img} alt={`promo-${i}`} width="640" height="360" />
        ))}
      </div> */}

      {/* COUNTDOWN */}
      {/* <div className="p-4 bg-yellto text-center">
        <p className="font-bold">Promo Akan Berakhir Dalam : </p>
        <CountdownTimer hours={0} minutes={9} seconds={0} />
      </div> */}

      {/* FORM TITLE + ARROW */}
      <br />
      <h1 className="text-center font-bold text-xl p-2" id="formulir">
        Isi Data Sekarang Sebelum Promonya Habis — Siapa Cepat Dia Dapat!
      </h1>

      <br />
      <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowDown} />
        <FontAwesomeIcon icon={faArrowDown} />
      </div>

      {/* URGENCY */}
      {/* <div className="text-center flex justify-center items-center gap-2 bg-greentoo/20 p-2">
        <span className="relative flex h-3 w-3 items-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-greento opacity-95"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-greento"></span>
        </span>
        <p className="text-sm">
          73 orang sekarang sedang ingin mengambil promo!
        </p>
      </div> */}

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
