import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Faqs from "../set/Faqs";
import MengantarForm from "../FunnelMengantar";
import { useEffect, useRef, useState } from "react";

const Footer = ({
  footerImages,
  faqs,
  hargaJual,
  NormalPrice,
  extraOffer, // optional
  url,
}) => {
  const normalPrice = NormalPrice;
  const promoPrice = hargaJual;
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(normalPrice);
  const promoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (promoRef.current) observer.observe(promoRef.current);

    return () => {
      if (promoRef.current) observer.unobserve(promoRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible && currentValue > promoPrice) {
      const step = (normalPrice - promoPrice) / 50;
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
      <div className="space-y-2" id="formulir">
        <h1 className="text-2xl font-bold text-center">
          ⚠ Promo 50% Hanya Untuk 3 Orang Pemesanan Pertama ⚠
        </h1>

        <div className="text-center">
          <p className="text-lg">
            Harga Normal{" "}
            <span className="line-through">
              Rp.{normalPrice.toLocaleString("id-ID")}
            </span>
          </p>
          <p className="text-lg">Harga Promo</p>
        </div>

        <div className="text-center text-5xl font-bold" ref={promoRef}>
          <h1 className="text-redto">
            Rp {Math.floor(currentValue).toLocaleString("id-ID")}
          </h1>
        </div>

        {extraOffer && (
          <div className="text-center text-xl font-bold italic">
            <h1>{extraOffer}</h1>
          </div>
        )}

				<br />

        <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
          <p className="bg-redto text-white text-sm px-3 flex items-center h-full w-1/3">
            Sisa Promo: 1
          </p>
        </div>

        <h1 className="text-center font-bold text-xl p-2">
          Isi Data Sekarang Sebelum Promonya Habis — Siapa Cepat Dia Dapat!
        </h1>

        <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
          <FontAwesomeIcon icon={faArrowDown} />
          <FontAwesomeIcon icon={faArrowDown} />
          <FontAwesomeIcon icon={faArrowDown} />
        </div>

        {/* GANTI FUNNEL DENGAN MENGANTARFORM */}
        {/* <div id="form">
          <MengantarForm 
            url="cctv" 
            domain="thruvshop.form.id" 
            settings={{
              type: "page",
              popupButtonText: "Klik untuk pemesanan",
              popupText: "Form Pemesanan",
              popupButtonColor: "#2e47ba",
              redirectTo: "https://thruvshop.form.id",
              isFbPixel: true,
              isHideBackground: true,
              isNoMargin: false,
              isGtm: true
            }}
          />
        </div> */}
        <MengantarForm url={url} />
      </div>

      {/* FAQ */}
      <div>
        <Faqs faqs={faqs} />
      </div>

      {/* FOOTER IMAGES */}
      <div className="grid justify-center items-center mt-4">
        {footerImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`footer-${i}`}
            width="640"
            height="360"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
