import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import Form from "./Form";

import Floting from "./Floting";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import FunnelAtc from '../FunnelAtc'
const bundles = [
  {
    title: "Beli 1",
    description: "Bonus 1 Kain Reffil",
    isRecommended: false,
    price: 479000,
    isPrice: 149000,
  },
  {
    title: "Beli 2",
    description: "Bonus 2 Kain Reffil",
    isRecommended: true,
    price: 958000,
    isPrice: 200000,
  },
  {
    title: "Beli 3",
    description: "Bonus 3 Kain Reffil",
    isRecommended: false,
    price: 1000000,
    isPrice: 250000,
  },
];

const Flat = () => {
  return (
    <div className="m-2">
      <div className="grid justify-center items-center">
        <img
          src="/images/pelflat/headline.webp"
          alt="haedline"
          width="640"
          height="360"
        />
        <div className="grid justify-center items-center text-center text-5xl text-redto font-bold">
          <h1>PEL TARIK</h1>
          <p>ANTI PERAS</p>
          <br />

          <div className="text-3xl">
            <p>Solusi Mengepel</p>
            <p>tanpa pegal untuk bunda</p>
          </div>
          <br />

          <div className="grid text-yellto text-2xl text-center">
            <div className="flex justify-center items-center ">
              <FontAwesomeIcon icon={faStar} size="2x" />
              <FontAwesomeIcon icon={faStar} size="2x" />
              <FontAwesomeIcon icon={faStar} size="2x" />
              <FontAwesomeIcon icon={faStar} size="2x" />
              <FontAwesomeIcon icon={faStarHalfStroke} size="2x" />
            </div>
            <br />
            <div className="text-black">
              <p>4.7 Rating</p>
              <p>Terjual 4.400 +</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="grid justify-center items-center text-center">
        {/* <h1 className="font-bold text-2xl m-2">Diskon <span className="text-redto font-bold">50%</span> + <span className="text-redto font-bold">Bonus Kain refill</span> Khusus Untuk Hari Ini </h1> */}

        <br />
        <p className="font-bold text-2xl">Promo Akan Berakhir Dalam : </p>
        <br />
        <CountdownTimer hours={0} minutes={9} seconds={0} />
        <br />
      </div>
      <Garansi />
      <br />

      <div>
        <div className="grid justify-center items-center">
          <br />
          <div className="flex justify-center items-center">
            <img
              src="images/tangansakit.jpg"
              alt="tanganpain"
              width="640"
              height="360"
            />
          </div>
          <br />
          <br />
          <p className="uppercase text-center font-bold text-3xl m-2">
            tangan pegal & sakit karena memeras kain pel ?{" "}
          </p>
        </div>
        <br />
        <br />
        <br />
        <div className="grid justify-center items-center text-center">
          <br />
          <p className="uppercase text-center font-bold text-3xl m-2">
            KALAU IYA, ANDA TIDAK PERLU KHAWATIR LAGI!
          </p>
          <div className="flex justify-center items-center">
            <img src="images/aa.jpg" alt="peraspel" width="640" height="360" />
          </div>
          <br />
          <br />
          <p className="text-xl">
            Karena dengan "Pel Tarik Anti Pegal", Anda tidak perlu lagi capek &
            pegal memeras kain pel di hidup Anda lagi.
          </p>
          <br />
          <br />
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/images/pelflat/otomatis.webp"
            alt="peras"
            width="640"
            height="360"
          />
        </div>

        <div className="text-xl space-y-2">
          <br />
          <div className="text-center">
            <br />
            <br />
            <br />
            <p className="font-bold text-center">
              Apa itu "Pel Tarik Anti Pegal " ?
            </p>
            <br />
            <p>
              "Pel Tarik Anti Pegal" adalah pel yang bisa memeras kainnya
              sendiri.
            </p>
            <p>
              Menyerap air sangat kuat dalam beberapa detik saja,yang membuat
              anda tidak perlu khawatir kalau ada yang basah
            </p>
            <br />
            <br />
            <br />
          </div>
          <br />
          <br />
          <p className="font-bold text-center text-2xl m-2">
            Kenapa Anda Harus Punya "Pel Tarik anti Pegal" ini ?
          </p>
          <ul className="list-inside list-disc grid  justify-center items-center m-2">
            <li>Tidak perlu pegal lagi memeras kain pel.</li>
            <li>Kain pel bisa dicuci dan diganti</li>
            <li>Gagang pel stainless steel (anti karat)</li>
            <li>Alat pel yang bisa di tekuk 180 derajat</li>
            <li>Tinggi pel 119 cm</li>
            <li>Besar bidang kain 36 cm x 11 cm</li>
          </ul>
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className="grid justify-center items-center space-y-4">
          <img
            src="/images/pelflat/produk4.webp"
            alt="product1"
            width="640"
            height="360"
          />
          <img
            src="/images/pelflat/produk1.webp"
            alt="product1"
            width="640"
            height="360"
          />
          <img
            src="/images/pelflat/produk5.webp"
            alt="product1"
            width="640"
            height="360"
          />
          <img
            src="/images/pelflat/produk2.webp"
            alt="product1"
            width="640"
            height="360"
          />
          <img
            src="/images/pelflat/produk3.webp"
            alt="product1"
            width="640"
            height="360"
          />
          <img
            src="/images/pelflat/produk6.webp"
            alt="product1"
            width="640"
            height="360"
          />
          {/* <img src="/images/pelflat/bonus.webp" alt="product1" width="640" height="360" /> */}
          <br />
          <br />
          <br />
        </div>

        <div>
          <div className="grid justify-center items-center m-2">
            <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
            <br />
            <br />
            <img
              src="images/pelflat/1.webp"
              alt="testimoni"
              width="640"
              height="360"
            />
            <img
              src="images/pelflat/2.webp"
              alt="testimoni"
              width="640"
              height="360"
            />
            <img
              src="images/pelflat/3.webp"
              alt="testimoni"
              width="640"
              height="360"
            />
            <br />
            <br />
            <br />
            <img
              src="images/pel/diskon.webp"
              alt="promo"
              width="640"
              height="360"
            />
            <img
              src="images/pel/99.webp"
              alt="promo"
              width="640"
              height="360"
            />
          </div>
          <div className="p-4 bg-yellto text-center">
            <p className="font-bold">Promo Akan Berakhir Dalam : </p>
            <CountdownTimer hours={0} minutes={9} seconds={0} />
          </div>
          <br />
          <br />
          <h1 className="text-center font-bold p-2 text-2xl" id="formulir">
            Isi Formulir untuk melakukan pemesanan
          </h1>
          <br />
          <br />
          <div className="text-center space-x-6 text-redto text-5xl animate-bounce">
            <FontAwesomeIcon icon={faArrowDown} />
            <FontAwesomeIcon icon={faArrowDown} />
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          {/* <Form /> */}
          <FunnelAtc
            bundlesData={bundles}
            customerServiceNumber="6282392135589"
            onAddToCartEvent={(bundle) => console.log("Custom Event:", bundle)}
          />
        </div>

        <br />
        <br />
        <div className="grid justify-center items-center">
          <img
            src="images/fotter2.webp"
            alt="footer"
            width="640"
            height="360"
          />
          <img src="images/fotter.webp" alt="footer" width="640" height="360" />
        </div>
        <br />
      </div>

      <Floting />
      {/* end div */}
    </div>
  );
};

export default Flat;
