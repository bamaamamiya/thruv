import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";

const LandingPage = () => {
  const productImages = [
    "images/pump/pump1.webp",
    "images/pump/pump3.webp",
  ];

  const testimonies = [
    "images/pump/1.webp",
    "images/pump/2.webp",
    "images/pump/3.webp",
  ];

  const promoImages = ["images/pel/diskon.webp", "images/pump/offer.webp"];

  const funnelProduct = {
    title: "Pel Tarik Anti Peras",
    description: "Bonus 1 kain Refill",
  };

  const faqs = [
    {
      question: "Apakah pompa ini bisa digunakan untuk semua jenis ban?",
      answer:
        "Bisa! Cocok untuk ban mobil, motor, sepeda, bahkan bola dan pelampung dengan nozzle tambahan.",
    },
    {
      question: "Apakah pompa ini butuh pompa manual atau tenaga tangan?",
      answer:
        "Tidak perlu! Cukup tekan tombol, pompa akan bekerja otomatis mengisi angin.",
    },
    {
      question: "Apakah tersedia berbagai nozzle untuk keperluan lain?",
      answer:
        "Iya! Dapat 3 bonus nozzle yang bisa dipakai untuk bola, pelampung, dan kebutuhan lainnya.",
    },
  ];

	const problems = [
		"Dijalan ban kempes tapi gak ada bengkel terdekat.",
		"Was-was di perjalanan, apalagi perjalanan jauh.",
		"Ngeluarin uang 20 ribu tiap minggu buat isi angin 4 ban.",
		"Belum lagi ban motor di rumah juga perlu isi angin.",
	];
	const solutions = [
		"Dijalan ban kempes tapi gak ada bengkel terdekat.",
		"Was-was di perjalanan, apalagi perjalanan jauh.",
		"Ngeluarin uang 20 ribu tiap minggu buat isi angin 4 ban.",
		"Belum lagi ban motor di rumah juga perlu isi angin.",
	];
	
  return (
    <div>
      <Headline
        imgHeadLine="images/pump/ban.webp"
        headLine="Ban Kempes di Tengah Jalan?"
        subHeadLine="Ribet Cari Tambal Ban?"
        problemTitle="Ngalamin Ini Gak Enak Kan Pak? 🥴"
				problems={problems}
      />
      <Content
				solutionTitle="Bayangin Pak... Pas Ban Kurang Angin, Tinggal Ambil PumpCharge Pro dari Bagasi, Colok, isi, Beres Tanpa Pusing Cari Bengkel🤩"
				solutions={solutions}
				mainImage="images/pump/pump4.webp"
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        pixelId="1093785025490959"
        produkBaru={funnelProduct}
        footerImages={[
          "images/fotter2.webp",
          "images/fotter.webp",
        ]}
        faqs={faqs}
      />
      <Floting />
    </div>
  );
};

export default LandingPage;
