import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";
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

  const productImages = ["images/speaker/5.webp", "images/speaker/4.webp"];

  const testimonies = [
    "images/speaker/testi1.webp",
    "images/speaker/testi2.webp",
    "images/speaker/testi3.webp",
  ];

  const faqs = [
    {
      question: "Apakah suara mic ada delay?",
      answer:
        "Tidak. Sistem wireless dibuat agar suara mic tetap responsif saat bernyanyi.",
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
        "Ya. Mic wireless akan otomatis terhubung saat speaker dinyalakan sehingga tidak perlu pairing yang rumit.",
    },
    {
      question: "Bisa dipakai anak-anak?",
      answer:
        "Bisa. Pengoperasiannya sangat sederhana sehingga mudah digunakan oleh anak-anak maupun orang dewasa.",
    },
    {
      question: "Selain Bluetooth bisa pakai apa lagi?",
      answer:
        "Bisa memutar lagu melalui TF Card yang berisi file MP3 sehingga tetap bisa digunakan tanpa koneksi Bluetooth.",
    },
    {
      question: "Aman gak transfer dulu?",
      answer:
        "Aman 100%! Rekening atas nama resmi & bergaransi 7 hari tukar baru jika ada masalah. Ratusan pelanggan sudah transfer duluan dan puas ✅",
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
    "2 Mic Wireless membuat semua orang bisa ikut bernyanyi tanpa rebutan.",
    "Suara lebih powerful dibanding speaker HP untuk karaoke bersama.",
    "Tinggal nyalakan dan sambungkan Bluetooth, langsung siap digunakan.",
    "Cocok untuk quality time keluarga, ulang tahun, dan kumpul teman.",
    "Nikmati sensasi karaoke di rumah tanpa harus keluar biaya mahal.",
    "Desain mini portable mudah dibawa untuk acara keluarga, piknik, atau perjalanan.",
    "Baterai tahan lama hingga berjam-jam untuk menemani waktu bernyanyi lebih lama.",
    "Bisa digunakan anak-anak maupun orang dewasa dengan penggunaan yang mudah.",
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
  const extraOffer = "🎁 Paket Lengkap Speaker + Bonus 2 Mic Wireless";
  const extraPush = "Dapatkan promo khusus hari ini + rincian pembayaran sesuai lokasi Anda.";

  return (
    <div className="bg-white">
      <Headline
        imgHeadLine="images/speaker/1.webp"
        headLine="Anak Mulai Bosan di Rumah & Keluarga Sibuk Dengan HP Masing-Masing?"
        subHeadLine="Hidupkan kembali suasana rumah dengan Speaker Karaoke Mini + 2 Mic Wireless. Tinggal nyalakan, pilih lagu, dan mulai bernyanyi bersama."
        problemTitle="😔 Kenapa Momen Kumpul Sering Terasa Kurang Seru?"
        problems={problems}
      />
      <Content
        solutionTitle="Bayangkan rumah yang biasanya sunyi berubah menjadi tempat penuh tawa, nyanyian, dan momen bersama keluarga."
        solutions={solutions}
        mainImage="images/speaker/3.webp"
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
      <Floting />
    </div>
  );
};

export default SpeakerMini;
