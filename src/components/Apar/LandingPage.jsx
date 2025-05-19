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
      question:
        "Apakah APAR ini Aman di taro di mobil yang sedang panas di parkiran?",
      answer:
        "Sangat Aman ! jika di taruh di kantong belakang kursi atau taruh di daerah yang bukan langsung dari sinar matahari",
    },
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
    " Korsleting di mobil bisa picu asap & api dalam hitungan detik.",
    "Mesin terlalu panas bisa nyulut api pas lagi nyetir bareng keluarga.",
    "Kebakaran kecApi kecil bisa jadi besar sebelum bantuan datang.",
    "Banyak mobil, rumah, & kantor belum punya APAR darurat.",
  ];
  const solutions = [
  "Lindungi keluarga dari risiko mobil terbakar saat perjalanan jauh atau macet.",
  "Cegah api dari korsleting atau tumpahan bensin sejak detik pertama muncul.",
  "Tenang saat bawa anak atau orang tua ada FireStop yang siap digunakan kapan saja.",
  "Gampang disimpan di bawah jok mobil atau bagasi, langsung dijangkau saat darurat.",
  "Bisa dipakai siapa saja, tanpa pelatihan tinggal tarik & semprot, api langsung padam.",
];


  return (
    <div>
      <Headline
        imgHeadLine="images/apar/car.webp"
        headLine="Mobil Bisa Terbakar Dalam Hitungan Detik"
        subHeadLine="Amankan mobil & keluarga hanya dengan 99rb FireStop bantu padamkan api dalam hitungan detik sebelum jadi bencana besar."
        problemTitle="🔥 Kebakaran Bisa Terjadi Karena Hal Sepele Seperti Ini 🔥 "
        problems={problems}
      />
      <Content
        solutionTitle="Bayangin Pak… Lagi di jalan bareng keluarga, tiba-tiba mobil kepanasan, keluar asap dari kap mesin!😱 Untung ada FireStop di laci — tinggal ambil, semprot, api langsung padam dalam hitungan detik!🔥"
        solutions={solutions}
        mainImage="images/apar/apar4.webp"
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        pixelId="2111198546014232"
        produkBaru={funnelProduct}
        footerImages={["images/fotter2.webp", "images/fotter.webp"]}
        faqs={faqs}
      />
      <Floting />
    </div>
  );
};

export default LandingPage;
