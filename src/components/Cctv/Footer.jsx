import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "../set/CountdownTimer";
import Funnel from "../FunnelPurchase";
import Faqs from "../set/Faqs";
import { useEffect, useRef, useState } from "react";
import PriceDisplay from "../set/PriceDisplay";
import BonusTF from "../set/BonusTF";

const Footer = ({
  pixelId,
  produkBaru,
  footerImages,
  faqs,
  hargaJual,
  namaProduct,
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
      <div className="space-y-2">
        {/* <h1 className="text-2xl font-bold text-center">
          ⚠ Promo 50% Hanya Untuk 3 Orang Pemesanan Pertama ⚠
        </h1>
        <div className="text-center">
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
        </div> */}

        <BonusTF
          valueStack={[
            {
              item: "✅ Kamera CCTV Bohlam E27",
              value: 249000,
            },
            {
              item: "🎁 Bonus Fitting Adapter E27",
              value: 15000,
            },
            {
              item: "📘 Buku Panduan Instalasi",
              value: 25000,
            },
            {
              item: "💸 Potongan Ongkir",
              value: 15000,
            },
            {
              item: "🚀 Pengiriman Prioritas",
              value: 30000,
            },
            {
              item: "🛡️ Garansi 7 Hari Ganti Baru",
              value: 40000,
            },
          ]}
          hargaPromo={hargaJual}
        />

        <h1 className="text-2xl font-bold text-center">
          ⚠ Promo 50% Hanya Untuk 3 Orang Pemesanan Pertama ⚠
        </h1>
        <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
          <p className="bg-redto text-white text-sm px-3 flex items-center h-full w-1/3">
            Sisa Promo: 1
          </p>
        </div>
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
        <Funnel
          pixel={pixelId}
          product={produkBaru}
          price={promoPrice}
          namaProduct={namaProduct}
        />
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
