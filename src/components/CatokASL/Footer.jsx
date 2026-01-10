import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Funnel from "../FunnelPurchaseAllInOne";
import Faqs from "../set/Faqs";
import Count from "./../set/Count";
import ValueStack from "../set/ValueStack";

import { useEffect, useRef, useState } from "react";
import MengantarForm from "../FunnelMengantar";
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
  NormalPrice,
  discountTransfer,
  extraOffer, // 👈 props baru
  adminWA,
  extraPush,
  useOngkir, // 👈 terima di sini
}) => {
  const normalPrice = NormalPrice; // harga normal
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

  // 	useEffect(() => {
  //   console.log("Props Footer:", {
  //     pixelId,
  //     produkBaru,
  //     footerImages,
  //     faqs,
  //     namaProduct,
  //     bundles,
  //     hargaJual,
  //     bonus,
  //     bonusTitle,
  //     NormalPrice,
  //     discountTransfer,
  //     extraOffer,
  //     adminWA,
  //   });
  // }, [
  //   pixelId,
  //   produkBaru,
  //   footerImages,
  //   faqs,
  //   namaProduct,
  //   bundles,
  //   hargaJual,
  //   bonus,
  //   bonusTitle,
  //   NormalPrice,
  //   discountTransfer,
  //   extraOffer,
  //   adminWA,
  // ]);
  const fotters = [
    "Bisa COD (Bayar di Tempat)",
    "Garansi 100% jika produk tidak sesuai pesanan",
    "Harga Promo Termurah Se-Indonesia Stok Terbatas — Siapa Cepat Dia Dapat!",
  ];

  const formatHargaToRb = (number) => {
    if (!number) return "0rb";
    return Math.round(number / 1000) + "rb";
  };

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
        <div className="text-center text-5xl font-bold " ref={promoRef}>
          {/* <h1 className="text-redto">
            Rp {Math.floor(currentValue).toLocaleString("id-ID")}
          </h1> */}
          <h1 className="text-redto uppercase">
            {formatHargaToRb(produkBaru.price)}
          </h1>
        </div>
        {/* EXTRA OFFER */}
        {extraOffer && (
          <div className="text-center text-xl font-bold italic">
            <h1>{extraOffer}</h1>
          </div>
        )}
        <div className="text-center font-bold text-sm p-4">
          <h1>{extraPush}</h1>
        </div>

        {/* <ValueStack
          values={[
            { title: "CCTV SMARTHOME", value: 249000 },
            { title: "Video Petunjuk CCTV", value: 50000 },
            { title: "Fitting & Baut", value: 20000 },
            { title: "Memori 32GB", value: 70000 },
          ]}
          totalValue={389000}
          promoPrice={promoPrice}
        /> */}
        {/* <div className="text-center text-sm">
          <p className="font-bold">{bonusTitle}</p>
          <p className="font-semibold pr-2 pl-2">
            {bonus}
          </p>
        </div> */}
        {/* 				
				<div>
					<Count/>
				</div> */}

        <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
          <p className="bg-redto text-white text-xs px-3 flex items-center h-full w-1/3">
            Sisa Promo: 1
          </p>
        </div>

        {/* <div>
					<ViewersCounter/>
				</div> */}

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
            useOngkir={useOngkir} // 🔥 KIRIM KE FUNNEL
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <section className="w-full max-w-md bg-gray-50 p-6 rounded-lg">
          <ul className="space-y-4">
            {fotters.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="flex-shrink-0 mt-1 text-red-500 text-xl">
                  ✔
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </section>
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
