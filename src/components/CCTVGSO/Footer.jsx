import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Funnel from "../FunnelPurchaseAlert";
import Faqs from "../set/Faqs";
import Count from "../set/Count";
import ValueStack from "../set/ValueStack";

import { useEffect, useRef, useState } from "react";
const Footer = ({
  pixelId,
  produkBaru,
  footerImages,
  faqs,
  namaProduct,
  bundles,
  hargaJual,
  bonus,
  bonusTitle,
  values,
  totalValue,
  discountTransfer,
}) => {
  const normalPrice = 249000; // harga normal
  const promoPrice = hargaJual; // harga promo
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
      <div className="space-y-2" id="formulir">
        <h1 className="text-2xl font-bold text-center">
          ⚠ Promo 50% Hanya Untuk 3 Orang Pemesanan Pertama ⚠
        </h1>
        <ValueStack
          values={values}
          totalValue={totalValue}
          promoPrice={promoPrice}
        />

        <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
          <p className="bg-redto text-white text-sm px-2 flex items-center h-full w-1/3">
            Sisa Promo: 1
          </p>
        </div>

        {/* FORM TITLE + ARROW */}
        <br />
        <h1 className="text-center font-bold text-xl p-2">
          Isi Data Sekarang Sebelum Promonya Habis — Siapa Cepat Dia Dapat!
        </h1>

        <br />
        <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
          <FontAwesomeIcon icon={faArrowDown} />
          <FontAwesomeIcon icon={faArrowDown} />
          <FontAwesomeIcon icon={faArrowDown} />
        </div>

        {/* FORM FUNNEL */}
        <div id="form">
          <Funnel
            pixel={pixelId}
            product={produkBaru}
            price={promoPrice}
            namaProduct={namaProduct}
            costProduct={produkBaru.costProduct}
            discountTransfer={discountTransfer} // ⬅ terusin ke Funnel
          />
        </div>
      </div>

      {/* FAQ */}
      <div>
        <Faqs faqs={faqs} />
      </div>

      {/* FOOTER IMAGE */}
      <br />
      <div className="grid justify-center items-center">
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
      <br />
    </div>
  );
};

export default Footer;
