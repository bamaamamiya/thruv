import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

const Headline = () => {
    return (
        <div className="grid justify-center items-center text-lg space-y-2">
            <div className="text-center">
                <h1 className="uppercase text-redto text-4xl font-extrabold text-center"> alat cukur elektrik anti luka & iritasi  </h1>
                <h2 className="capitalize text-xl font-bold">diskon 50% + diskon ongkir +
                    <span className="text-redto"> GRATIS Sikat Pembersih</span> khusus hari ini saja! </h2>
            </div>
            <div className="flex justify-center items-center">
                <img src="/images/header.webp" alt="produk" className="h-auto w-[100%]"/>
            </div>

            <div className="text-center">
                <p>Kepala pemotong baja presisi terbuat dari bahan ABS plus proses pelapisan listrik yang aman dan tajam, tidak mudah panas, memastikan efisiensi dan daya tahan</p>
            </div>

            <div className="grid justify-center items-center bg-redto text-white">
                <h1 className="text-center capitalize text-3xl ">KEUNGGULAN PRODUK</h1>
            </div>

            <div className="flex justify-center items-center">
                <ul className="grid justify-start items-center text-justify">
                    <li className="text-green-500"><FontAwesomeIcon icon={faSquareCheck} /> <span className="text-black">Cukup 1 alat untuk segala kebutuhan</span> </li>
                    <li className="text-green-500"><FontAwesomeIcon icon={faSquareCheck} /> <span className="text-black">Stabil dan tidak bising</span> </li>
                    <li className="text-green-500"><FontAwesomeIcon icon={faSquareCheck} /> <span className="text-black">Gak perlu ganti-ganti baterai, tinggal di charge gak ribet</span> </li>
                    <li className="text-green-500"><FontAwesomeIcon icon={faSquareCheck} /> <span className="text-black">Mudah dibersihan, sehingga mencukur tetap higenis tanpa khawatir iritasi</span> </li>
                    <li className="text-green-500"><FontAwesomeIcon icon={faSquareCheck} /> <span className="text-black">Awet, kuat dan anti karat</span> </li>
                </ul>
            </div>

            <div className="space-y-2 grid justify-center">
                <img src="/images/spek.webp" alt="produk" className="h-auto w-[100%]"/>
                <img src="/images/spek2.webp" alt="produk" className="h-auto w-[100%]"/>
            </div>

            <div>
                <h1 className="text-center capitalize text-3xl bg-redto text-white">SPESIFIKASI PRODUK</h1>
                <div className="list-disc">
                    <p>Warna : Dikirim acak sesuai stock</p>
                    <p>Ukuran : 40mm x 86mm</p>
                    <p>Power : 3W</p>
                    <p>Daya : Baterry charging</p>
                    <p>Bahan : ABS + d proses pelapisan listrik</p>
                    <br />
                    <p>Isi Kemasan:</p>
                    <p>1 * Mini Shaver V3</p>
                    <p>1 * Sikat pembersih</p>
                    <p>1 * Kabel pengisian USB</p>
                    <p>1 * Kotak kemasan</p>
                </div>
            </div>

            <br />

            <div className="space-y-2">
                <h1 className="text-center text-3xl font-bold">Berapa Harganya ?</h1>

                <p className="text-redto  text-center text-2xl font-extrabold">PROMO KHUSUS 10 PEMBELI!! DAN UNTUK KAMU YANG TRANSAKSI SEKARANG.</p>

                <p className="text-gray-700 text-4xl font-extrabold line-through text-center">Rp. 320.191</p>

                <p className="text-center font-bold">Diskon Menjadi</p>
                <p className="text-4xl font-extrabold line-through text-center">Rp. 220.191</p>

                <p className="text-center font-bold text-xl text-redto">Diskon Cuma Hari ini !</p>
                <p className="text-5xl font-extrabold text-redto text-center">Rp. 99 RB</p>
            </div>

            
        </div>
    )
}

export default Headline
