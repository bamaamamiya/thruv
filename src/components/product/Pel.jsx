import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import Form from './Form'

import Floting from "./Floting";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'

const Pel = () => {
    return (
        <div className="m-2">
            <div className="grid justify-center items-center">
                <img src="images/pel/headline3.webp" alt="haedline" width="640" height="360" />
                <div className="grid justify-center items-center text-center text-5xl text-redto font-bold">
                    <h1>PEL KARET</h1>
                    <p>ANTI PERAS</p>
                    <br />

                    <div className="text-3xl">
                        <p>Solusi Mengepel</p>
                        <p>tanpa pegal untuk bunda</p>
                    </div>
                    <br />

                    <div className="grid text-yellto text-2xl text-center">
                        <div className="flex justify-center items-center">

                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />

                        </div>
                        <br />
                        <div className="text-black">
                            <p>4.8 Rating</p>
                            <p>Terjual 10.000 +</p>
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
                    <img src="images/pel/tangansakit.webp" alt="tanganpain" width="640" height="360" />
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
                    <img src="images/pel/peraspel.webp" alt="peraspel" width="640" height="360" />
                    <br />
                    <br />
                    <p>Karena dengan "Pel Anti Pegal", Anda tidak perlu lagi capek & pegal memeras kain pel di hidup Anda lagi.</p>
                    <br />
                    <br />
                </div>
                <div className="flex justify-center items-center">
                    <img src="images/pel/peras.webp" alt="peras" width="640" height="360" />
                </div>

                <div className="text-xl space-y-2">
                    <br />
                    <div className="text-center">
                        <br />
                        <br />
                        <br />
                        <p className="font-bold text-center">Apa itu "Pel Karet Anti Pegal " ?</p>
                        <p>"Pel Anti Pegal" adalah pel yang bisa memeras kainnya sendiri.</p>
                        <p>Menyerap air sangat kuat dalam beberapa detik saja,yang membuat anda tidak perlu khawatir kalau ada yang basah</p>
                        <br />
                        <br />
                        <br />
                    </div>
                    <br />
                    <br />
                    <p className="font-bold text-center text-2xl m-2">Kenapa Anda Harus Punya "Pel anti Pegal" ini ?</p>
                    <ul className="list-inside list-disc grid  justify-center items-center m-2">
                        <li>Tidak perlu pegal lagi memeras kain pel.</li>
                        <li>Karet pel halus dan tahan lama</li>
                        <li>Gagang pel stainless steel (anti karat)</li>
                        <li>Alat pel yang bisa di tekuk 180 derajat</li>
                        <li>Tinggi pel 96 -125 cm</li>
                        <li>Daya serap spons tinggi</li>
                    </ul>
                    <br />
                </div>
                <br />
                <br />
                <br />
                <div className="grid justify-center items-center space-y-4">
                    <img src="images/pel/gambar1.webp" alt="product1" width="640" height="360" />
                    <img src="images/pel/newpics.webp" alt="product2" width="640" height="360" />
                    <img src="images/pel/newpics1.webp" alt="product2" width="640" height="360" />
                    <img src="images/pel/product4.webp" alt="product2" width="640" height="360" />
                    <img src="images/pel/serap.webp" alt="product2" width="640" height="360" />
                    <img src="images/pel/q.webp" alt="product2" width="640" height="360" />
                </div>


                <div>
                    <div className="grid justify-center items-center m-2">
                        <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
                        <br />
                        <br />
                        <img src="images/pel/1.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/pel/2.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/pel/3.webp" alt="testimoni" width="640" height="360" />
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

                    <div className="text-center flex justify-center items-center gap-2 bg-greentoo/20 p-2">
                        <span class="relative flex h-3 w-3 items-center">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-greento opacity-95"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-greento"></span>
                        </span>
                        <p className="text-sm">  73 orang sekarang sedang ingin mengambil promo!</p>
                    </div>
                    <Form />
                </div>

                <br />
                <br />
                <div className="grid justify-center items-center">
                    <img src="images/fotter2.webp" alt="footer" width="640" height="360" />
                    <img src="images/sek.webp" alt="footer" width="640" height="360" />
                    <img src="images/fotter.webp" alt="footer" width="640" height="360" />
                </div>
                <br />
            </div>

            <Floting />
            {/* end div */}
        </div>

    )
}

export default Pel
