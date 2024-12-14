import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import Form from './Form'

import Floting from "./Floting";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'

const Flat = () => {
    return (
        <div className="m-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
            <div className="text-center text-2xl font-bold">
            <p>Kulit Lebih Kencang, Mata Tampak Lebih Muda</p>
            </div>
            <br/>
            <div className="grid justify-center items-center">
                <img src="/images/eye/1.webp" alt="haedline" width="640" height="360" />
            </div>
            <div className="text-center text-2xl font-bold">
            <p>Perawatan yang Anda Butuhkan untuk Mata Bebas Lingkaran Hitam dan Kerutan</p>
            </div>
            <br />

            <div className="grid justify-center items-center">
                <img src="images/eye/problem.webp" alt="mata" width="640" height="360"  />

            </div>
            <br />


            {/* problem */}
            <div className="text-center ">
                <h1 className="text-3xl font-semibold">APA ANDA SEDANG MENGALAMAI MASALAH INI?</h1>
                <br/>
                <br/>
                <p>Capek melihat mata panda setiap kali bercermin? Kenapa tidak mencoba solusi yang tepat?</p>
                <br/>
                <p>Mencari cara untuk menghaluskan kulit di sekitar mata dan mengurangi kerutan yang muncul?</p>
                <br/>
                <p>Sering merasa mata Anda bengkak setelah tidur? Ingin kembali terlihat segar setiap pagi?</p>
                <br/>
                <br/>
                <h1 className="text-3xl font-semibold">Beauty Of Angel Eye Cream, Solusi Tepat dan Terbaik Buat Kamu!!</h1>
                <br/>
                <div className="p-2 space-y-2 grid justify-center items-center">
                    <img src="images/eye/2.webp" alt="produk"  width="640" height="360" />
                    <img src="images/eye/3.webp" alt="produk"  width="640" height="360" />
                    <img src="images/eye/4.webp" alt="produk"  width="640" height="360" />
                    <img src="images/eye/6.webp" alt="produk"  width="640" height="360" />
                    <img src="images/eye/7.webp" alt="produk"  width="640" height="360" />
                    <img src="images/eye/8.webp" alt="produk"  width="640" height="360" />
                </div>
                <br/>
            </div>

            <Garansi />
            <br />

            <div >

                <div>
                    <div className="grid justify-center items-center m-2">
                        <h1 className="font-bold text-center text-4xl">TESTIMONI</h1>
                        <br />
                        <br />
                        <img src="images/eye/testi1.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/eye/testi2.webp" alt="testimoni" width="640" height="360" />
                        <img src="images/eye/testi3.webp" alt="testimoni" width="640" height="360" />
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
