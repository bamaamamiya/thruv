// src/components/PriceDisplay.jsx
import { useEffect, useState } from "react";

const PriceDisplay = ({ normalPrice, promoPrice, threshold = 0.5, stepDuration = 30 }) => {
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
      { threshold: threshold }
    );

    if (promoRef.current) {
      observer.observe(promoRef.current);
    }

    return () => {
      if (promoRef.current) {
        observer.unobserve(promoRef.current);
      }
    };
  }, [threshold]);

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
      }, stepDuration);
    }
  }, [isVisible, currentValue, promoPrice, normalPrice, stepDuration]);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          ⚠Promo 40% Hanya Untuk 3 Orang Pemesanan Pertama⚠
        </h1>
        <br />
        <p className="text-lg">
          Harga Normal <span className="line-through">{normalPrice.toLocaleString("id-ID")}</span>
        </p>
        <p className="text-lg">Harga Promo</p>
      </div>
      <div className="text-center text-5xl font-bold" ref={promoRef}>
        <h1>Rp {Math.floor(currentValue).toLocaleString("id-ID")}</h1>
      </div>
      <br />
      <div className="w-auto h-8 bg-gray-300 rounded overflow-hidden m-2">
        <p className="bg-redto text-white text-sm px-3 flex items-center h-full w-1/3">
          Sisa Promo: 1
        </p>
      </div>
    </div>
  );
};

export default PriceDisplay;
