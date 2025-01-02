import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import Form from './Form'

import Floting from "./Floting";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'

const X = () => {
    return (
        <div className="m-2">
            <div className="grid justify-center items-center">
                <img src="/images/x/headline.webp" alt="haedline" width="640" height="360" />
                <div className="grid justify-center items-center text-center text-5xl text-redto font-bold">
                    <br />
                    <h1>PEL MAGIC</h1>
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
                            <p>Terjual 1.500 +</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />

            <div className="grid justify-center items-center text-center">
                <h1 className="font-bold text-2xl m-2">Diskon <span className="text-redto font-bold">50%</span>  Khusus Untuk Hari Ini </h1>
                
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
                    <img src="images/tangansakit.jpg" alt="tanganpain" width="640" height="360" />
                    </div>
                    <br />
                    <br />
                    <p className="uppercase text-center font-bold text-3xl m-2">tangan pegal & sakit karena memeras kain pel ? </p>
                </div>
                <br />
                <br />
                <br />
                <div className="grid justify-center items-center text-center">
                    <br />
                    <p className="uppercase text-center font-bold text-3xl m-2">KALAU IYA, ANDA TIDAK PERLU KHAWATIR LAGI!</p>
                    <div className="flex justify-center items-center">
                        <img src="images/aa.jpg" alt="peraspel" width="640" height="360" />
                    </div>
                    <br />
                    <br />
                    <p className="text-xl">Karena dengan "Pel Magic Anti Pegal", Anda tidak perlu lagi capek & pegal memeras kain pel di hidup Anda lagi.</p>
                    <br />
                    <br />
                </div>
                <div className="flex justify-center items-center">
                    <img src="/images/x/7.webp" alt="peras" width="640" height="360" />
                </div>

                <div className="text-xl space-y-2">
                    <br />
                    <div className="text-center">
                        <br />
                        <br />
                        <br />
                        <p className="font-bold text-center">Apa itu "Pel Magic Anti Pegal " ?</p>
                        <br />
                        <p>"Pel Magic Anti Pegal" adalah pel yang bisa memeras kainnya sendiri.</p>
                        <p>Menyerap air sangat kuat dalam beberapa detik saja,yang membuat anda tidak perlu khawatir kalau ada yang basah</p>
                        <br />
                        <br />
                        <br />
                    </div>
                    <br />
                    <br />
                    <p className="font-bold text-center text-2xl m-2">Kenapa Anda Harus Punya "Pel Magic anti Pegal" ini ?</p>
                    <div className="m-4 ">
                    <ul className="list-outside list-disc grid  justify-center items-center m-2 ">
                        <li>Tidak perlu pegal lagi memeras kain pel.</li>
                        <li>Kain pel bisa dicuci dan diganti</li>
                        <li>Gagang pel stainless steel (anti karat)</li>
                        <li>Alat pel yang bisa di putar 360 derajat</li>
                        <li>Tinggi pel 130 cm</li>
                        <li>Besar bidang kain 36 cm x 14 cm</li>
                    </ul>
                    </div>
                    <br />
                </div>
                <br />
                <br />
                <br />
                <div className="grid justify-center items-center space-y-4">
                    <img src="/images/x/1.webp" alt="product1" width="640" height="360" />
                    <img src="/images/x/2.webp" alt="product1" width="640" height="360" />
                    <img src="/images/x/3.webp" alt="product1" width="640" height="360" />
                    <img src="/images/x/4.webp" alt="product1" width="640" height="360" />
                    <img src="/images/x/5.webp" alt="product1" width="640" height="360" />
                    <br />
                    <br />
                    <br />
                </div>


                <div>
                    <div className="grid justify-center items-center m-2">
                        <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
                        <br />
                        <br />
                        <img src="images/x/t1.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/x/t2.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/x/t3.webp" alt="testimoni" width="640" height="360" />
                        <br />
                        <br />
                        <br />
                        <img src="images/pel/diskon.webp" alt="promo" width="640" height="360" />
                        <img src="images/119.webp" alt="promo" width="640" height="360" />
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

export default X
