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

  const funnelProduct = product
    ? {
        title: product.title,
        price: product.pricing?.price,
        costProduct: product.pricing?.cost,
        upsells: product.upsells || [],
      }
    : null;

  const productImages = ["images/speaker/5.webp", "images/speaker/4.webp"];

  const testimonies = [
    "images/speaker/testi1.webp",
    "images/speaker/testi2.webp",
    "images/speaker/testi3.webp",
  ];

  const faqs = [
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
    "Kumpul keluarga jadi sepi karena semua sibuk main HP.",
    "Suara speaker HP terlalu kecil untuk karaoke bersama.",
    "Anak-anak cepat bosan saat di rumah.",
    "Acara keluarga terasa biasa tanpa hiburan.",
    "Mau karaoke di rumah tapi alatnya mahal dan ribet.",
  ];

  // const solutions = [
  //   "Pantau rumah dari HP secara real-time, kapan saja dan di mana saja.",
  //   "Kamera bisa muter 360°, sudut pandang luas, gak ada titik buta.",
  //   "Ada motion detection — otomatis rekam & kirim notifikasi ke HP saat ada gerakan.",
  //   "Tanpa kabel & tanpa teknisi — cukup pasang di fitting lampu E27, langsung nyala.",
  //   "Support night vision, jadi tetap bisa ngawasin rumah meskipun malam atau lampu mati.",
  // ];
  const solutions = [
    "Tinggal nyalakan, langsung karaoke tanpa setting rumit.",
    "Suara lebih kencang dan jernih dibanding speaker HP.",
    "Mic wireless membuat bernyanyi lebih bebas dan seru.",
    "Cocok untuk keluarga, anak-anak, hingga acara bersama teman.",
    "Ubah ruang tamu jadi tempat karaoke kapan saja tanpa biaya mahal.",
  ];

  const pixel = 600654142367970;
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
        imgHeadLine="images/speaker/1.webp"
        headLine="Momen Kumpul Terasa Sepi Karena Gak Ada yang Menghidupkan Suasana?"
        subHeadLine="Speaker Karaoke Mini dengan mic wireless yang bikin keluarga dan teman lebih seru bernyanyi bersama kapan saja."
        problemTitle="😔 Kenapa Momen Kumpul Sering Terasa Kurang Seru :"
        problems={problems}
      />
      <Content
        solutionTitle="Bayangin, setiap akhir pekan di rumah dipenuhi tawa dan nyanyian, bukan lagi semua sibuk dengan HP masing-masing. Hadirkan momen kebersamaan yang lebih hangat dengan Speaker Karaoke Mini yang siap menemani setiap acara."
        solutions={solutions}
        mainImage="images/speaker/3.webp"
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
      <Floting />
    </div>
  );
};

export default SpeakerMini;
