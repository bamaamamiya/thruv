import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
const SpeakerMini = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", "prod-02"); // 🔥 id dari DB
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setProduct(snapshot.data());
      }
    };

    fetchProduct();
  }, []);

  const productImages = ["images/speaker/1.webp", "images/speaker/4.webp"];

  const testimonies = [
    "images/speaker/testi1.webp",
    "images/speaker/testi2.webp",
    "images/speaker/testi3.webp",
  ];

  const faqs = [
    {
      question: "Apakah suara mic ada delay?",
      answer:
        "Tidak. Mic dibuat agar suara tetap cepat dan tidak terasa terlambat saat bernyanyi.",
    },
    {
      question: "Apakah cocok untuk hadiah anak?",
      answer:
        "Sangat cocok. Banyak digunakan sebagai hadiah ulang tahun karena bisa dimainkan bersama keluarga.",
    },
    {
      question: "Apakah mudah digunakan?",
      answer:
        "Ya. Tidak membutuhkan setting rumit, cukup hidupkan speaker, sambungkan Bluetooth, lalu mulai bernyanyi.",
    },
    {
      question: "Apakah harus pakai kabel saat digunakan?",
      answer:
        "Tidak. Speaker menggunakan Bluetooth dan mic wireless sehingga lebih praktis tanpa kabel yang mengganggu.",
    },
    {
      question: "Berapa lama baterainya bertahan?",
      answer:
        "Speaker dapat digunakan sekitar 5–10 jam tergantung volume pemakaian.",
    },
    {
      question: "Apakah mic langsung tersambung ke speaker?",
      answer:
        "Ya, Tidak perlu setting rumit. Nyalakan speaker dan mic, lalu bisa langsung dipakai.",
    },
    {
      question: "Bisa dipakai anak-anak?",
      answer:
        "Bisa. Pengoperasiannya sangat sederhana sehingga mudah digunakan oleh anak-anak maupun orang dewasa.",
    },
    {
      question: "Selain Bluetooth bisa pakai apa lagi?",
      answer: "Bisa juga pakai kartu memori untuk memutar lagu MP3",
    },
    {
      question: "Aman gak transfer dulu?",
      answer:
        "Takut transfer duluan? Tenang. Pembayaran dilakukan ke rekening resmi toko. Jika barang bermasalah, tersedia garansi tukar baru 7 hari sesuai ketentuan.",
    },
  ];

  // const problems = [
  //   "Rumah sering kosong tapi gak tahu gimana cara pantau dari jauh.",
  //   "Maling masuk rumah bisa lewat sudut yang gak terjangkau CCTV biasa.",
  //   "CCTV lama cuma rekam, gak ada notifikasi saat ada gerakan mencurigakan.",
  //   "Pasang CCTV ribet, butuh teknisi dan kabel panjang kemana-mana.",
  // ];
  const problems = [
    "Anak-anak cepat bosan dan akhirnya kembali bermain HP.",
    "Kumpul keluarga terasa hambar karena tidak ada aktivitas bersama.",
    "Speaker HP tidak cukup keras untuk bernyanyi ramai-ramai.",
    "Ingin karaoke tapi malas keluar rumah dan bayar mahal.",
    "Speaker biasa tidak punya mic sehingga kurang seru untuk karaoke.",
  ];

  // const solutions = [
  //   "Pantau rumah dari HP secara real-time, kapan saja dan di mana saja.",
  //   "Kamera bisa muter 360°, sudut pandang luas, gak ada titik buta.",
  //   "Ada motion detection — otomatis rekam & kirim notifikasi ke HP saat ada gerakan.",
  //   "Tanpa kabel & tanpa teknisi — cukup pasang di fitting lampu E27, langsung nyala.",
  //   "Support night vision, jadi tetap bisa ngawasin rumah meskipun malam atau lampu mati.",
  // ];
  const solutions = [
    "Ada 2 mic, jadi bisa nyanyi berdua tanpa rebutan.",
    "Suara lebih keras daripada speaker HP, jadi enak buat karaoke bareng.",
    "Tinggal nyalakan dan sambungkan Bluetooth, langsung siap digunakan.",
    "Cocok untuk quality time keluarga, ulang tahun, dan kumpul teman.",
    "Nikmati sensasi karaoke di rumah tanpa harus keluar biaya mahal.",
    "Ukurannya kecil, jadi mudah dibawa ke mana-mana.",
    "Baterainya tahan lama, jadi bisa karaoke lebih lama.",
    "Mudah dipakai anak-anak maupun orang dewasa.",
  ];

  const pixels = [
    "600654142367970", // pixel baru
    "2111198546014232", // pixel lama
  ];

  function getNormalPrice(sellingPrice, discountRate) {
    if (discountRate >= 1 || discountRate < 0) {
      throw new Error("Discount rate harus antara 0 dan 1");
    }
    return sellingPrice / (1 - discountRate);
  }
  const discount = 0.5; // 50%
  const hargaNormal = product
    ? getNormalPrice(product.pricing?.price, discount)
    : 0;

  const discountTransfer = false; // 🔥 tinggal ubah true/false
  const extraOffer = "Ambil 1 Speaker, Gratis 2 Mic";
  const extraPush = "Harga promo belum termasuk ongkir.";
  return (
    <div className="bg-white">
      <Headline
        imgHeadLine="images/speaker/head.webp"
        headLine="Anak Mulai Bosan di Rumah & Keluarga Sibuk Dengan HP Masing-Masing?"
        subHeadLine="Hidupkan kembali suasana rumah dengan Speaker Karaoke Mini + 2 Mic Wireless. Tinggal nyalakan, pilih lagu, dan mulai bernyanyi bersama."
        problemTitle="😔 Kenapa Momen Kumpul Sering Terasa Kurang Seru?"
        problems={problems}
      />
      <Content
        solutionTitle="Bayangkan rumah yang biasanya sunyi berubah menjadi tempat penuh tawa, nyanyian, dan momen bersama keluarga."
        solutions={solutions}
        mainImage="images/speaker/tail.webp"
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        hargaJual={product?.pricing?.price}
        pixelId={pixels}
        produkBaru={product}
        footerImages={["images/fotter2.webp"]}
        faqs={faqs}
        namaProduct={product?.title}
        NormalPrice={hargaNormal}
        discountTransfer={discountTransfer} // ⬅ lempar ke Footer
        extraOffer={extraOffer}
        extraPush={extraPush}
      />
    </div>
  );
};

export default SpeakerMini;
