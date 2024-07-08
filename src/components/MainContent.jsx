import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import Footer from './Footer';

const MainContent = () => {
    return (
        <div className='grid justify-center items-center h-screen gap-2'>

            <h1 className='text-center text-5xl font-bold'>Sering pegal setelah olahraga atau aktivitas seharian??😫</h1>

            <div className='text-center space-y-6 text-xl gap-2 grid'>
                <div className='flex justify-center'>
                <img src="https://cdn.orderonline.id/uploads/images_9904061716624178468.jpg" alt="alat pijit"/>
                </div>
                <p>Pijat tradisional membutuhkan waktu dan cukup melelahkan. Belum lagi kalo mau pijat saat malam hari, banyak tempat pijat yang sudah tutup.😖😔</p>
                <div className='flex justify-center'>
                <img src="https://cdn.orderonline.id/uploads/images_9997211716624178190.jpg" alt="alat pijit2" />
                </div>
                <p>Wah, capek banget kalo badan pegal tapi nggak sempat pijat. Mau biarin aja takutnya pegalnya semakin parah dan mengganggu aktivitas.😫😰</p>
                <div className='flex justify-center'>
                <img src="https://cdn.orderonline.id/uploads/images_7855651716624178451.jpg" alt="alat pijit2" />
                </div>
                <p>Nikmati sensasi pijat profesional kapanpun dan diamanapun dengan Gun Massage! Alat pijat ini dilengkapi dengan motor kuat dan 4 kepala pijat berbeda fungsi.</p>
                <p>Kamu bisa menyesuaikan intensitas pijatan sesuai kebutuhan untuk menghilangkan pegal dan meregangkan otot secara efektif.😉💪💯</p>
                
                <div className='text-center space-y-6 text-xl gap-2'>
                <h1 className='text-3xl font-bold'>Apa yang membuat produk kami berbeda?</h1>
                <div className='flex justify-center'>
                <img src="https://cdn.orderonline.id/uploads/images_3914981716624178230.jpg" alt="alat pijit2" />
                </div>
                <p>Beda dengan alat pijat lainnya yang kurang efektif, Gun Massage memberikan sensasi pijatan yang lebih dalam dan menyeluruh.</p>
                <p>Desainnya yang ringan dan mudah digenggam membuat kamu bisa melakukan pijat sendiri dengan mudah di rumah.✅😉</p>
                </div>
                
                <div>
                <h1 className='text-3xl font-bold'>Detail dan Spesifikasi</h1>
                <div className='flex justify-center'>
                <img src="https://cdn.orderonline.id/uploads/images_2816791716624178322.jpg" alt="alat pijit2" />
                </div>

                    <div className='grid items-center justify-center'>
                    <p className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faCircleCheck} />
                        Tipe USB: Tipe C</p>
                    <p className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    4 x Kepala tembakan</p>
                    <p className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    Kapasitas baterai: 1800 mAh</p>
                    <p className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    1 x Alat Pijat Elektrik Massage Gun</p>
                    <p className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faCircleCheck} /> 
                    1 x Kabel Tipe C (tidak termasuk kepala charger)</p>
                    </div>
                </div>


                <div className='space-y-6'>
                    <h1 className='text-3xl font-bold'>MILIKI PRODUK INI SEBELUM KEHABISAN !!</h1>
                    <p className='text-3xl font-bold'>Beli Hari ini !</p>
                    <p className='text-3xl font-bold'>HARGA ASLINYA </p>

                    <h1 className='text-redto font-bold text-4xl line-through'>Rp 299.000/Pcs</h1>
                    <p className='font-bold'>Anda beruntung datang hari ini, kami memberikan DISKON sebesar 50%</p>
                    <div className='flex justify-center'>
                    <img src="https://cdn.orderonline.id/uploads/images_1102061704446430091.gif" alt="promo" />
                    </div>
                    <h1 className='text-5xl font-bold text-greento '>Rp. 149 Ribu</h1>
                    <p>(Jangan tunggu! Stok terbatas, jadi manfaatkan kesempatan ini sekarang.)</p>
                    <p>Kami Produksi Produk ini sendiri, sehingga bisa dipastikan bukan Produk yg abal- abal atau kualitas rendah</p>
                </div>

                <div>
                    <p>Silahkan isi 
                        <span> FORMULIR </span>
                        dibawah ini untuk melakukan pemesanan, lalu Klik Tombol 
                        <span> "PESAN SEKARANG" </span>
                        dan tunggu sampai Customer Service kami membalas pesan Anda
                    </p>

                    <a href='https://thruvshop.orderonline.id/gun-massager-alat-pijat-terapi-relaksasi-otot-4-in-1' className='text-5xl bg-greento p-4 text-white rounded-md'>Pesan Sekarang</a>
                </div>

                <div className='space-y-6'>
                    <div className='grid justify-center'>
                    <img src="https://cdn.orderonline.id/uploads/images_4058231696554402567.jpg" alt="cod" />
                    <img src="https://cdn.orderonline.id/uploads/images_5129121704767930808.gif" alt="cod" />
                    </div>
                    
                    <p><span className='font-bold'>Peringatan.</span> Jangan  gunakan  Gun Massage  pada  luka  terbuka  atau  area  tulang.  Konsultasikan  dengan  dokter  jika  mengalami  kondisi  medis  tertentu  sebelum  menggunakan  alat  pijat  ini.</p>
                    <p><span className='font-bold'>Aturan.</span>  Halaman ini bertujuan memberikan informasi produk atau layanan kami yang akurat dan relevan, dengan larangan terhadap penggunaan menyesatkan, spam, atau pelanggaran hak cipta. Kami menjaga privasi pengunjung dan mendorong penggunaan sesuai ketentuan serta peraturan yang berlaku.</p>
                </div>
            </div> 
            
            <Footer/>
        </div>
    );
};

export default MainContent;
