import React from "react";
import CountdownTimer from "../set/CountdownTimer";
import Garansi from "../set/Garansi";
import Form from './Form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const Pel = () => {
    return (
        <div className="m-2">
            <div className="flex justify-center items-center">
                <img src="images/pel/headline2.webp" alt="haedline" width="640" height="360" />
            </div>

            <div className="grid justify-center items-center text-center">
                <h1 className="font-semibold">Diskon <span className="text-redto font-bold">50%</span> Khusus Untuk Hari Ini</h1>
                <p className="font-semibold">Promo Akan Berakhir Dalam : </p>
                <CountdownTimer hours={0} minutes={9} seconds={0} />
            </div>
            <Garansi />

            <div >
                <div className="grid justify-center items-center">
                    <img src="images/pel/tangansakit.webp" alt="tanganpain" width="640" height="360" />
                    <p className="uppercase text-center font-bold text-3xl">tangan pegal & sakit karena memeras kain pel ? </p>
                </div>
                <div className="grid justify-center items-center text-center">
                    <br />
                    <p className="uppercase text-center font-bold text-3xl">KALAU IYA, ANDA TIDAK PERLU KHAWATIR LAGI!</p>
                    <img src="images/pel/peraspel.webp" alt="peraspel" width="640" height="360" />
                    <p>Karena dengan "Pel Anti Pegal", Anda tidak perlu lagi capek & pegal memeras kain pel di hidup Anda lagi.</p>
                </div>
                <div className="flex justify-center items-center">
                    <img src="images/pel/peras.webp" alt="peras" width="640" height="360" />
                </div>

                <div className="text-xl space-y-2">
                    <br />
                    <div className="text-center">
                        <p className="font-bold text-center">Apa itu "Pel Karet Anti Pegal " ?</p>
                        <p>"Pel Anti Pegal" adalah pel yang bisa memeras kainnya sendiri.</p>
                        <p>Menyerap air sangat kuat dalam beberapa detik saja,yang membuat anda tidak perlu khawatir kalau ada yang basah</p>
                    </div>
                    <br />
                    <br />
                    <p className="font-bold text-center">Kenapa Anda Harus Punya "Pel anti Pegal" ini ?</p>
                    <ul className="list-inside list-disc grid  justify-center items-center">
                        <li>Tidak perlu pegal lagi memeras kain pel.</li>
                        <li>Karet pel halus dan tahan lama</li>
                        <li>Gagang pel stainless steel (anti karat)</li>
                        <li>Alat pel yang bisa di tekuk 180 derajat</li>
                        <li>Tinggi pel 96 -125 cm</li>
                        <li>Daya serap spons tinggi</li>
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <div className="grid justify-center items-center space-y-2">
                    <img src="images/pel/gambar1.webp" alt="product1" width="640" height="360" />
                    <img src="images/pel/gambar2.webp" alt="product2" width="640" height="360" />
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
                        <img src="images/pel/promo1.webp" alt="promo" width="640" height="360" />
                        <img src="images/pel/promo.webp" alt="promo" width="640" height="360" />
                    </div>
                    <div className="p-4 bg-yellto text-center">
                        <p className="font-bold">Promo Akan Berakhir Dalam : </p>
                        <CountdownTimer hours={0} minutes={9} seconds={0} />
                    </div>

                    <h1 className="text-center font-bold p-2 text-2xl">Cek Ongkir dan Potongan Harga disini</h1>
                    <div className='text-center space-x-6 text-redto text-5xl animate-bounce'>
                        <FontAwesomeIcon icon={faArrowDown} />
                        <FontAwesomeIcon icon={faArrowDown} />
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                    <Form />
                </div>

                <div>
                    <img src="images/fotter2.webp" alt="footer" width="640" height="360" />
                    <img src="images/fotter.webp" alt="footer" width="640" height="360" />
                </div>
            </div>



            {/* end div */}
        </div>

    )
}

export default Pel