import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import Form from './Form'

import Floting from "./Floting";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import ProductFeatures from "./Feature";

const Flat = () => {
    return (
        <div className="m-2">
            <div className="grid justify-center items-center">
                <div className="flex justify-center items-center">
                <img src="/images/mini/headline.jpg" alt="haedline" width="640" height="360" />
                </div>
                <div className="grid justify-center items-center text-center text-2xl text-redto font-bold">
                    <h1>ThruvClean - Mini</h1>
                    <br />
                    <h1>Meja Kinclong Tanpa Repot</h1>
                    <p>Hemat Waktu dan Tenaga!</p>
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
                            <p>4.8 Rating</p>
                            <p>Terjual 3.400 +</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />

            <div className="grid justify-center items-center text-center">
                <h1 className="font-bold text-2xl m-2">Diskon <span className="text-redto font-bold">50%</span> Khusus Untuk Hari Ini</h1>
                <br />
                <p className="font-bold text-2xl">Promo Akan Berakhir Dalam : </p>
                <br />
                <CountdownTimer hours={0} minutes={9} seconds={0} />
                <br />
            </div>
            <Garansi />
            <br />

            <div >
                <div className="grid justify-center items-center">
                    <br />
                    <div className="flex justify-center items-center">
                    <img src="images/mini/wipe1.png" alt="tanganpain" width="640" height="360" />
                    </div>
                    <br />
                    <br />
                    <p className="uppercase text-center font-bold text-3xl m-2">Tangan mudah kotor dan bau setelah digunakan </p>
                </div>
                <br />
                <br />
                <br />
                <div className="grid justify-center items-center text-center">
                    <br />
                    <p className="uppercase text-center font-bold text-3xl m-2">KALAU IYA, ANDA TIDAK PERLU KHAWATIR LAGI!</p>
                    <div className="flex justify-center items-center">
                        <img src="images/mini/nose.png" alt="peraspel" width="640" height="360" />
                    </div>
                    <br />
                    <br />
                    <p className="text-xl">Karena dengan "ThruvClean Mini", Anda tidak perlu lagi capek & pegal memeras kain pel di hidup Anda lagi.</p>
                    <br />
                    <br />
                </div>
                <div className="flex justify-center items-center">
                    <img src="/images/mini/2.jpg" alt="peras" width="640" height="360" />
                </div>

                <div className="text-xl space-y-2">
                    <br />
                    <div className="text-center">
                        <br />
                        <br />
                        <br />
                        <p className="font-bold text-center">Apa itu "ThruvClean Mini " ?</p>
                        <br />
                        <p>"ThruvClean Mini" adalah mini-pel yang bisa memeras kainnya sendiri.</p>
                        <br/>
                        <p>Menyerap air sangat kuat dalam beberapa detik saja,yang membuat anda tidak perlu khawatir kalau ada yang basah</p>
                        <br />
                        <br />
                        <br />
                    </div>
                    <br />
                    <br />
                    <p className="font-bold text-center text-2xl m-2">Kenapa Anda Harus Punya "ThruvClean Mini" ini ?</p>
                    <ProductFeatures/>

                    <br />
                </div>
                <br />
                <br />
                <br />
                <div className="grid justify-center items-center space-y-4">
                    <img src="/images/mini/3.jpg" alt="product1" width="640" height="360" />
                    <img src="/images/mini/4.webp" alt="product1" width="640" height="360" />
                    <img src="/images/mini/5.png" alt="product1" width="640" height="360" />
                    <img src="/images/mini/6.png" alt="product1" width="640" height="360" />
                    <img src="/images/mini/7.png" alt="product1" width="640" height="360" />
                    <br />
                    <br />
                    <br />
                </div>


                <div>
                    <div className="grid justify-center items-center m-2">
                        <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
                        <br />
                        <br />
                        <img src="images/mini/testi1.png" alt="testimoni" width="640" height="360" />
                        <img src="images/mini/testi2.png" alt="testimoni" width="640" height="360" />
                        <img src="images/mini/testi3.png" alt="testimoni" width="640" height="360" />
                        
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

            <Floting />
            {/* end div */}
        </div>

    )
}

export default Flat
