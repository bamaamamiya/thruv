import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Floting = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("formulir");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting); // kalau form kelihatan → hide
      },
      { threshold: 0.20 } // 50% dari form keliatan
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const el = document.getElementById("formulir");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full p-2 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-redto text-white rounded-lg shadow-lg">
        <button
          onClick={handleClick}
          className="space-x-2 font-bold p-2 flex justify-center items-center w-full"
          aria-label="Ambil Promo"
        >
          <FontAwesomeIcon icon={faCartShopping} />
          <span>AMBIL PROMO ( BISA COD )</span>
        </button>
      </div>
    </div>
  );
};

export default Floting;
