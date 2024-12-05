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
import ProductFeatures from "./Feature";

const Mini = () => {
  return (
    <div className="p-4 text-xl">
      <div>
        <h1 className="text-center text- font-semibold">
          Bersihkan Meja Tanpa Repot, Tanpa Kotoran - Dengan ThruvClean Mini
        </h1>
        <br />
        <div className="flex justify-center items-center">
          <img src="images/mini/headline.jpeg" />
        </div>
        <br />
        <p>
          Tidak perlu lagi khawatir dengan kain lap yang basah dan kotor saat
          membersihkan meja atau jendela. ThruvClean Mini hadir sebagai solusi
          praktis untuk memberikan kenyamanan dan kebersihan maksimal dengan
          cara yang lebih cepat dan higienis.
        </p>
        <br />
        <p>
          Solusi Pembersihan Modern Dengan ThruvClean Mini, Anda bisa
          membersihkan meja atau permukaan lainnya tanpa harus menyentuh kotoran
          langsung. Pel mini ini dirancang untuk memudahkan pekerjaan rumah
          tangga Anda, menjaga tangan tetap bersih, dan memastikan kebersihan
          yang lebih efektif.
        </p>
        <br />
        <br />
        <h1 className="text-center font-semibold">
          Kenapa ThruvClean Mini adalah Pilihan Tepat untuk Bunda?
        </h1>
        <br />
        <div className="flex">
          <ul className="list-disc	list-inside">
            <li>
              Hindari Kain Lap Kotor: Tidak ada lagi kebutuhan untuk mencuci
              atau membilas kain lap, cukup gunakan ThruvClean Mini untuk hasil
              bersih maksimal dalam satu gerakan.
            </li>
            <br />
            <li>
              Bersihkan Meja Tanpa Menyentuh Kotoran: Pel mini ini dirancang
              untuk menjaga tangan Anda tetap higienis tanpa kontak langsung
              dengan kotoran.
            </li>
            <br />
            <li>
              Pembersihan Tanpa Repot: Hanya satu gerakan mudah untuk meja
              bersih, praktis, cepat, dan efisien tanpa harus menunggu kain lap
              atau pembersih lainnya.
            </li>
            <br />
          </ul>
        </div>

        <div>
          <ProductFeatures />
        </div>
      </div>


      <div>
                    <div className="grid justify-center items-center m-2">
                        <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
                        <br />
                        <br />
                        <img src="images/pelflat/1.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/pelflat/2.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/pelflat/3.webp" alt="testimoni" width="640" height="360" />
                        <br />
                        <br />
                        <br />
                        <img src="images/pel/diskon.webp" alt="promo" width="640" height="360" />
                        <img src="images/pel/99.webp" alt="promo" width="640" height="360" />
                    </div>
                    <div className="p-4 bg-yellto text-center">
                        <p className="font-bold">Promo Akan Berakhir Dalam : </p>
                        <CountdownTimer hours={0} minutes={9} seconds={0} />

                    </div>
                    <br />
                    <br />
                    <h1 className="text-center font-bold p-2 text-2xl" id="formulir">Isi Formulir untuk melakukan pemesanan</h1>
                    <br />
                    <br />
                    <div className='text-center space-x-6 text-redto text-5xl animate-bounce' >
                        <FontAwesomeIcon icon={faArrowDown} />
                        <FontAwesomeIcon icon={faArrowDown} />
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                    <Form />
                </div>

                <br />
                <br />
                <div className="grid justify-center items-center">
                    <img src="images/fotter2.webp" alt="footer" width="640" height="360" />
                    <img src="images/fotter.webp" alt="footer" width="640" height="360" />
                </div>
                <br />
            </div>
  );
};

export default Mini;
