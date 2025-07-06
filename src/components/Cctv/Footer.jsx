import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "../set/CountdownTimer";
import Funnel from "../FunnelPurchase";
import Faqs from "../set/Faqs";
import { useEffect, useRef, useState } from "react";
import PriceDisplay from "../set/PriceDisplay";
import PaymentComparison from "../set/PaymentComparisonTable";

const Footer = ({ pixelId, produkBaru, footerImages, faqs, hargaJual }) => {
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
      <div className="space-y-2">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            ⚠ Promo 50% Hanya Untuk 3 Orang Pemesanan Pertama ⚠
          </h1>
          <br />
          <p className="text-lg">
            Harga Normal <span className="line-through">Rp.249.000</span>
          </p>
          <p className="text-lg">Harga Promo</p>
        </div>
        <div className="text-center text-5xl font-bold" ref={promoRef}>
          <h1 className="text-redto">
            Rp {Math.floor(currentValue).toLocaleString("id-ID")}
          </h1>
        </div>
        <br />
        <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
          <p className="bg-redto text-white text-sm px-3 flex items-center h-full w-1/3">
            Sisa Promo: 1
          </p>
        </div>

        {/* <PaymentComparison
          bonusItem="Bonus Bulb Adapter"
          cashback="Potongan ongkir 15RB"
          priorityShipping="Prioritas Kirim"
          digitalGuide="Panduan Digital"
          guarantee="Garansi 7 HARI"
          codFee="Biaya COD"
        /> */}

        {/* <div className="bg-yellow-100 border border-yellow-400 rounded-md p-3 text-sm text-gray-800 text-center mx-2 mb-4">
          🎁 <strong>Bonus Hari Ini:</strong>
          Dapatkan{" "}
          <span className="font-semibold">
            Adapter Bulb senilai Rp20.000
          </span>{" "}
          secara GRATIS khusus untuk pembayaran via Transfer!
          <span className="text-red-500 font-medium block mt-1">
            *Hanya untuk 3 pembeli pertama hari ini*
          </span>
        </div> */}
      </div>

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

      {/* FORM FUNNEL */}
      <div id="form">
        <Funnel pixel={pixelId} product={produkBaru} price={promoPrice} />
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
