import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";

const LandingPage = () => {
  const productImages = ["images/apar/apar1.webp", "images/apar/apar3.webp"];

  const testimonies = [
    "images/apar/3.webp",
    "images/apar/1.webp",
    "images/apar/2.webp",
  ];


  const funnelProduct = {
    title: "Apar Portable",
    description: "Product Apar",
  };

  const faqs = [
    {
      question: "Apakah APAR ini bisa digunakan lebih dari sekali?",
      answer:
        "APAR ini dirancang untuk penggunaan sekali semprot saat keadaan darurat. Jika sudah dipakai, tidak bisa diisi ulang kembali.",
    },
    {
      question: "Apakah aman digunakan oleh siapa saja?",
      answer:
        "Sangat aman! Tidak butuh pelatihan khusus, cukup buka tutup pengaman dan semprotkan ke sumber api dari jarak 30 cm.",
    },
    {
      question: "Bisa dipakai untuk kebakaran apa saja?",
      answer:
        "Cocok untuk kebakaran ringan kelas A dan B seperti korsleting listrik, kebakaran dapur, mobil, dan lainnya.",
    },
    {
      question: "Apakah alat ini ramah lingkungan?",
      answer:
        "Ya! Menggunakan bahan AFFF yang non-toxic, non-corrosive, dan aman untuk pernapasan serta tidak merusak lingkungan.",
    },
  ];

  const problems = [
    "Korsleting listrik bisa picu kebakaran dalam hitungan detik.",
    "Kompor lupa dimatikan bisa bikin dapur terbakar tanpa disadari.",
    "Kebakaran kecil bisa jadi besar sebelum bantuan datang.",
    "Rumah, mobil, atau kantor belum punya alat pemadam darurat.",
  ];
  const solutions = [
    "Gampang disimpan di mobil, dapur, kamar, atau kantor!",
    "Bisa dipakai siapa aja, bahkan tanpa pelatihan khusus.",
    "Lebih tenang di rumah & perjalanan — selalu siap hadapi korsleting atau kebakaran kecil.",
    "Lebih hemat. 1 alat bisa cegah kerugian puluhan juta karena kebakaran!",
    " Sekali semprot langsung padam, tanpa perlu selang atau alat berat!",
  ];

  return (
    <div>
      <Headline
        imgHeadLine="images/apar/car.webp"
        headLine="Mobil Bisa Terbakar Dalam Hitungan Detik"
        subHeadLine="Cegah kerugian jutaan rupiah hanya dengan alat cuma seharga 99RB yang bisa digunakan siapa saja."
        problemTitle="⚠️ Kebakaran Bisa Terjadi Karena Hal Sepele Seperti Ini ⚠️ "
        problems={problems}
      />
      <Content
        solutionTitle="Bayangin Pak… Lagi Masak di Dapur atau Nyalain Stop Kontak, Eh Api Tiba-Tiba Nyala! Untung Ada FireStop — Tinggal Semprot, Api Langsung Padam dalam Hitungan Detik!🔥"
        solutions={solutions}
        mainImage="images/apar/apar4.webp"
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        pixelId="1093785025490959"
        produkBaru={funnelProduct}
        footerImages={["images/fotter2.webp", "images/fotter.webp"]}
        faqs={faqs}
      />
      <Floting />
    </div>
  );
};

export default LandingPage;
