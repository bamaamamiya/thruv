import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faEye,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Funnel from "../OrderMachineNew";
import Faqs from "../set/Faqs";

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
  NormalPrice,
  discountTransfer,
  extraOffer, // 👈 props baru
  adminWA,
  extraPush,
  useOngkir, // 👈 terima di sini
}) => {
  const normalPrice = NormalPrice; // harga normal
  const promoPrice = produkBaru?.pricing?.price || 0; // harga promo
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(normalPrice);
  const [viewersCount] = useState(
    () => Math.floor(Math.random() * (100 - 80 + 1)) + 80,
  );

  const [soldCount] = useState(
    () => Math.floor(Math.random() * (700 - 500 + 1)) + 500,
  );
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const promoRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
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

  useEffect(() => {
    const STORAGE_KEY = "checkout_promo_end_time";
    const DURATION = 12 * 60 * 1000; // 12 menit

    let endTime = localStorage.getItem(STORAGE_KEY);

    if (!endTime) {
      endTime = Date.now() + DURATION;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    } else {
      endTime = parseInt(endTime, 10);

      // Kalau countdown sudah habis,
      // mulai countdown 12 menit lagi.
      if (endTime <= Date.now()) {
        endTime = Date.now() + DURATION;
        localStorage.setItem(STORAGE_KEY, endTime.toString());
      }
    }

    const updateCountdown = () => {
      const remaining = Math.max(0, endTime - Date.now());

      const totalSeconds = Math.floor(remaining / 1000);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        hours,
        minutes,
        seconds,
      });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value) => {
    return String(value).padStart(2, "0");
  };

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
            {formatHargaToRb(produkBaru?.pricing?.price)}
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
        {/* SOCIAL PROOF */}
        <div className="mx-auto mt-3 mb-4 grid max-w-md grid-cols-2 gap-3 px-2">
          {/* VIEWERS */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-redto/10 text-redto">
              <FontAwesomeIcon icon={faEye} className="text-lg" />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-extrabold leading-none text-gray-900">
                {viewersCount}
              </p>

              <p className="mt-1 text-[11px] font-medium leading-tight text-gray-500">
                orang sedang melihat
              </p>
            </div>
          </div>

          {/* SOLD */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-redto/10 text-redto">
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
            </div>

            <div className="min-w-0">
              <p className="text-lg font-extrabold leading-none text-gray-900">
                {soldCount}
              </p>

              <p className="mt-1 text-[11px] font-medium leading-tight text-gray-500">
                total terjual hingga kini
              </p>
            </div>
          </div>
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

        <br />
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

        {/* COUNTDOWN */}
        <div className="mx-auto mt-5 max-w-sm px-4">
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-center text-sm font-medium text-gray-500">
              Promo berakhir dalam
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">
              {/* JAM */}
              <div className="min-w-16 rounded-xl bg-gray-50 px-3 py-2 text-center">
                <div className="text-2xl font-bold tracking-tight text-gray-900">
                  {formatTime(timeLeft.hours)}
                </div>

                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Jam
                </div>
              </div>

              <span className="pb-4 text-xl font-bold text-gray-300">:</span>

              {/* MENIT */}
              <div className="min-w-16 rounded-xl bg-gray-50 px-3 py-2 text-center">
                <div className="text-2xl font-bold tracking-tight text-gray-900">
                  {formatTime(timeLeft.minutes)}
                </div>

                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Menit
                </div>
              </div>

              <span className="pb-4 text-xl font-bold text-gray-300">:</span>

              {/* DETIK */}
              <div className="min-w-16 rounded-xl bg-redto/5 px-3 py-2 text-center">
                <div className="text-2xl font-bold tracking-tight text-redto">
                  {formatTime(timeLeft.seconds)}
                </div>

                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-redto/60">
                  Detik
                </div>
              </div>
            </div>
          </div>
        </div>

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
            costProduct={produkBaru?.pricing?.cost || 0}
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
