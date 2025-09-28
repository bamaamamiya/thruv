import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Funnel from "../FunnelPurchase";
import Count from "./../set/Count";
import ValueStack from "../set/ValueStack";

import { useEffect, useRef, useState } from "react";
import ViewersCounter from "../set/ViewersCounter";
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
  buttonColor,
  buttonHoverColor,
}) => {
  const normalPrice = NormalPrice; // harga normal
  const promoPrice = hargaJual; // harga promo
  return (
    <div>
      <div className="space-y-2" id="formulir">

				{/* FORM TITLE + ARROW */}
        <br />
        <h1 className="text-center font-bold text-xl p-2">
          Isi Data Sekarang Sebelum Promonya Habis — Siapa Cepat Dia Dapat!
        </h1>
        {/* FORM FUNNEL */}
        <div id="form">
          <Funnel
            pixel={pixelId}
            product={produkBaru}
            price={produkBaru.price}
            namaProduct={namaProduct}
            costProduct={produkBaru.costProduct}
            discountTransfer={discountTransfer} // ⬅ terusin ke Funnel
            buttonColor={buttonColor}
            buttonHoverColor={buttonHoverColor}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
