import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";

const CctvBohlam = () => {
  const productImages = ["images/cctv/3.webp", "images/cctv/4.webp"];

  const testimonies = [
    "images/cctv/testi1.webp",
    "images/cctv/testi2.webp",
    "images/cctv/testi3.webp",
  ];

  const funnelProduct = {
    title: "Cctv bohlam",
    description: "Product CCTV BOHLAM",
    price: 129000,
  };

  const faqs = [
    {
      question: "Apakah CCTV ini harus pakai kabel?",
      answer:
        "Tidak perlu! Cukup dipasang di fitting lampu biasa (E27), tanpa instalasi kabel tambahan.",
    },
    {
      question: "Apakah CCTV ini bisa dipantau dari HP?",
      answer:
        "Bisa! CCTV ini terhubung ke HP kamu lewat aplikasi, jadi kamu bisa pantau dari mana aja secara real-time.",
    },
    {
      question: "Apakah kamera bisa muter otomatis?",
      answer:
        "Ya! Kamera ini punya fitur rotasi 360° yang bisa dikontrol dari HP atau otomatis mengikuti gerakan.",
    },
    {
      question: "Kalau malam hari, masih kelihatan jelas gak?",
      answer:
        "Jelas! CCTV ini dilengkapi night vision, jadi tetap bisa merekam dengan jelas meskipun dalam gelap.",
    },
    {
      question: "Apakah bisa digunakan di luar ruangan?",
      answer:
        "Disarankan untuk penggunaan indoor. Jika ingin dipasang outdoor, pastikan terlindung dari hujan dan panas langsung.",
    },
  ];

  const problems = [
    "Rumah sering kosong tapi gak tahu gimana cara pantau dari jauh.",
    "Maling masuk rumah bisa lewat sudut yang gak terjangkau CCTV biasa.",
    "CCTV lama cuma rekam, gak ada notifikasi saat ada gerakan mencurigakan.",
    "Pasang CCTV ribet, butuh teknisi dan kabel panjang kemana-mana.",
  ];

  const solutions = [
    "Pantau rumah dari HP secara real-time, kapan saja dan di mana saja.",
    "Kamera bisa muter 360°, sudut pandang luas, gak ada titik buta.",
    "Ada motion detection — otomatis rekam & kirim notifikasi ke HP saat ada gerakan.",
    "Tanpa kabel & tanpa teknisi — cukup pasang di fitting lampu E27, langsung nyala.",
    "Support night vision, jadi tetap bisa ngawasin rumah meskipun malam atau lampu mati.",
  ];

  return (
    <div>
      <Headline
        imgHeadLine="images/cctv/1.webp"
        headLine="Pernah kepikiran, rumah ditinggal sebentar aja bisa jadi sasaran maling?"
        subHeadLine="Atau tiba-tiba barang hilang tapi gak tau siapa pelakunya?"
        problemTitle="📹 Banyak Rumah Masih Rentan Karena Masalah Seperti Ini:"
        problems={problems}
      />
      <Content
        solutionTitle="Bayangin Pak… Rumah kosong pas lagi mudik atau kerja, eh tiba-tiba ada orang asing masuk halaman rumah!😱 Untungnya, CCTV Bohlam ini kirim notifikasi ke HP + rekam kejadian secara real-time!📲"
        solutions={solutions}
        mainImage="images/cctv/2.webp"
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        hargaJual={funnelProduct.price}
        pixelId="2111198546014232"
        produkBaru={funnelProduct}
        footerImages={["images/fotter2.webp", "images/fotter.webp"]}
        faqs={faqs}
      />
      <Floting />
    </div>
  );
};

export default CctvBohlam;
