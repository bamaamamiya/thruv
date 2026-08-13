import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
const CctvBohlam = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", "prod-03"); // 🔥 id dari DB
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setProduct(snapshot.data());
      }
    };

    fetchProduct();
  }, []);

  const funnelProduct = product
    ? {
        title: product.title,
        price: product.pricing?.price,
        costProduct: product.pricing?.cost,
        upsells: product.upsells || [],
      }
    : null;

  const productImages = ["images/cctv/3.webp", "images/cctv/4.webp"];

  const testimonies = [
    "images/cctv/testi1.webp",
    "images/cctv/testi2.webp",
    "images/cctv/testi3.webp",
  ];

  // const BonusData = {
  // 	title:"Bonus : ",
  // 	bonus: "Fitting & Baut + Vidio Panduan + Gratis COD"
  // }

  const bundles = [
    {
      id: "bohlam-only",
      title: "CCTV Bohlam",
      price: 129000,
    },
    {
      id: "bohlam-16gb",
      title: "CCTV + Memori 16GB",
      price: 199000,
    },
    {
      id: "bohlam-32gb",
      title: "CCTV + Memori 32GB",
      price: 249000,
    },
  ];

  const faqs = [
    // {
    //   question: "Kalau barang rusak atau cacat gimana?",
    //   answer:
    //     "Ada Garansi 30 Hari Tukar Baru. Cukup kasih video unboxing + foto paket, langsung kami proses.",
    // },
    {
      question: "Apakah CCTV ini harus pakai kabel?",
      answer:
        "Tidak perlu! Cukup pasang di fitting lampu biasa (E27), langsung nyala tanpa instalasi ribet atau biaya teknisi tambahan. Praktis & hemat waktu!",
    },
    {
      question: "Bagaimana cara setting CCTV ini?",
      answer:
        "Super mudah! Kami sediakan buku panduan + video tutorial lengkap. Tinggal ikuti langkahnya, dalam hitungan menit CCTV siap dipakai.",
    },
    {
      question: "Apakah CCTV ini bisa dipantau dan dikontrol dari HP?",
      answer:
        "Bisa! Tinggal buka aplikasi di HP, Anda bisa memantau gambar dan mengontrol arah kamera kapan saja, di mana saja, real-time langsung dari genggaman.",
    },
    {
      question: "Apakah kamera bisa dipantau dari jauh?",
      answer:
        "Ya! Selama CCTV terhubung ke WiFi dan HP Anda terkoneksi internet, Anda bisa memantau rumah, toko, atau kantor dari jarak ribuan kilometer sekalipun.",
    },
    {
      question:
        "Bagaimana kualitas rekaman CCTV ini di kondisi minim cahaya atau malam hari?",
      answer:
        "Sangat jelas! Dengan teknologi night vision canggih, kamera ini mampu menangkap gambar tajam dan detail meskipun dalam gelap total, memastikan keamanan Anda 24 jam nonstop.",
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
    "Udah kerja banting tulang tiap hari, tapi rumah sering kosong tanpa pengawasan",
    "Barang-barang hasil kerja keras bisa raib cuma dalam beberapa menit waktu rumah sepi",
    "Maling sekarang makin pintar, tahu kapan rumah kosong dan CCTV gak merekam arah itu",
    "Gak ada tetangga yang sadar, gak ada bukti siapa pelakunya — ujung-ujungnya cuma bisa pasrah.",
    "Baru sadar rumah dibobol pas semuanya udah terlambat.",
  ];

  // const solutions = [
  //   "Pantau rumah dari HP secara real-time, kapan saja dan di mana saja.",
  //   "Kamera bisa muter 360°, sudut pandang luas, gak ada titik buta.",
  //   "Ada motion detection — otomatis rekam & kirim notifikasi ke HP saat ada gerakan.",
  //   "Tanpa kabel & tanpa teknisi — cukup pasang di fitting lampu E27, langsung nyala.",
  //   "Support night vision, jadi tetap bisa ngawasin rumah meskipun malam atau lampu mati.",
  // ];
  const solutions = [
    "Bisa lihat kondisi rumah langsung dari HP, kapan pun dan di mana pun kamu berada.",
    "Kameranya bisa muter ke segala arah, jadi gak ada sudut yang kelewat.",
    "Begitu ada gerakan mencurigakan, HP kamu langsung dapet pemberitahuan otomatis.",
    "Gak perlu kabel atau teknisi — tinggal putar di fitting lampu, langsung bisa dipakai.",
    "Bisa ngawasin rumah meski malam hari, tetap jelas walau lampu mati.",
  ];

  const pixel = 2111198546014232;
  const pixelString = pixel.toString();

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
  const extraOffer = "+ Potongan Ongkir";
  const extraPush = "Harga diatas belum termasuk ongkir";

  return (
    <div className="bg-white">
      <Headline
        imgHeadLine="images/cctv/1.webp"
        headLine="Capek kerja siang-malam beli barang berharga… tapi bisa hilang dalam sekejap kalau rumah kosong?"
        subHeadLine="Amankan rumah dan barang berharga di mana pun kamu taruh mudah dipasang, bisa diandalkan bertahun-tahun, tanpa ribet kabel atau teknisi"
        problemTitle="📹 Banyak Rumah Masih Rentan Karena Masalah Seperti Ini:"
        problems={problems}
      />
      <Content
        solutionTitle="Bayangin, Kerja keras tiap hari tapi rumah sering kosong? Barang hasil jerih payah bisa hilang dalam sekejap. Cegah semua itu dengan CCTV Bohlam — cukup putar di fitting lampu, langsung nyala tanpa teknisi atau kabel ribet."
        solutions={solutions}
        mainImage="images/cctv/2.webp"
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        hargaJual={product?.pricing?.price}
        pixelId={pixelString}
        produkBaru={product}
        footerImages={["images/fotter2.webp"]}
        faqs={faqs}
        namaProduct={product?.title}
        NormalPrice={hargaNormal}
        discountTransfer={discountTransfer} // ⬅ lempar ke Footer
        extraOffer={false}
        extraPush={extraPush}
      />
    </div>
  );
};

export default CctvBohlam;
