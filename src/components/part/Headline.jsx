import React from "react";

const Headline = () => {
    return (
        <div className="grid justify-center items-center text-lg space-y-2">
            <div className="text-center">
            <h1 className="uppercase text-redto text-4xl font-extrabold text-center"> alat cukur elektrik anti luka & iritasi  </h1>
            <h2 className="capitalize text-xl font-bold">diskon 50% + diskon ongkir + 
                <span className="text-redto"> GRATIS E-BOOK</span> khusus hari ini saja! </h2>
            </div>
            <div className="flex justify-center items-center">
                <img src="https://cdn.scalev.id/Image/062c54c075ba458d8e5e066cf61a0497.webp" />
            </div>

            <div className="text-center">
                <p>Kepala pemotong baja presisi terbuat dari bahan ABS plus proses pelapisan listrik yang aman dan tajam, tidak mudah panas, memastikan efisiensi dan daya tahan</p>
            </div>

            <div>
                <h1 className="text-center capitalize text-3xl bg-redto text-white">KEUNGGULAN PRODUK</h1>
                <div>
                    <p>✅ Cukup 1 alat untuk segala kebutuhan</p>
                    <p>✅ Stabil dan tidak bising</p>
                    <p>✅ Gak perlu ganti-ganti baterai, tinggal di charge gak ribet</p>
                    <p>✅ Mudah dibersihan, sehingga mencukur tetap higenis tanpa khawatir iritasi</p>
                    <p>✅ Awet, kuat dan anti karat</p>
                </div>
            </div>

            <div className="space-y-2 grid justify-center">
                <img src="https://cdn.scalev.id/Image/1e285de2cdf843b89afb0868fa4fb15f.webp"/>
                <img src="https://cdn.scalev.id/Image/8d80530908004f8bbcccb44c2fcb80ed.webp"/>
            </div>

            <div>
                <h1 className="text-center capitalize text-3xl bg-redto text-white">SPESIFIKASI PRODUK</h1>
                <ul className="list-disc">
                    <li>Warna : Dikirim acak sesuai stock</li>
                    <li>Ukuran : 40mm x 86mm</li>
                    <li>Power : 3W</li>
                    <li>Daya : Baterry charging</li>
                    <li>Bahan : ABS + d proses pelapisan listrik</li>
                        <br/>
                    <li>Isi Kemasan:</li>
                    <li>1 * Mini Shaver V3</li>
                    <li>1 * Sikat pembersih</li>
                    <li>1 * Kabel pengisian USB</li>
                    <li>1 * Kotak kemasan</li>
                </ul>
            </div>

<br/>

            <div className="space-y-2">
                <h1 className="text-center text-3xl font-bold">Berapa Harganya ?</h1>

                <p className="text-redto  text-center text-2xl font-extrabold">PROMO KHUSUS 50 PEMBELI!! DAN UNTUK KAMU YANG TRANSAKSI SEKARANG.</p>

                <p className="text-gray-400 text-4xl font-extrabold line-through text-center">Rp. 320.191</p>

                <p className="text-center font-bold">Diskon Menjadi</p>
                <p className="text-4xl font-extrabold line-through text-center">Rp. 220.191</p>

                <p className="text-center font-bold text-xl text-redto">Diskon Cuma Hari ini !</p>
                <p className="text-4xl font-extrabold text-redto text-center">Rp. 95 RB</p>
            </div>

            <div>
                <p className="bg-redto text-white text-center">SILAKAN ISI FORM DI BAWAH INI</p>
            </div>
        </div>
    )
}

export default Headline
