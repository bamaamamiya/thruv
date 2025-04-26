import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../Floting";

const LandingPage = () => {
  const productImages = [
    "images/pump/pump4.webp",
    "images/pump/pump5.webp",
		"images/pump/pump2.webp",
    "images/pump/pump3.webp",
    "images/pump/pump1.webp",
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
			answer: "Bisa! Cocok untuk ban mobil, motor, sepeda, bahkan bola dan pelampung dengan nozzle tambahan.",
		},
		{
			question: "Apakah pompa ini butuh pompa manual atau tenaga tangan?",
			answer: "Tidak perlu! Cukup tekan tombol, pompa akan bekerja otomatis mengisi angin.",
		},
		{
			question: "Apakah tersedia berbagai nozzle untuk keperluan lain?",
			answer: "Iya! Dapat 3 bonus nozzle yang bisa dipakai untuk bola, pelampung, dan kebutuhan lainnya.",
		},
	];
	
	
  return (
    <div>
      <Headline
        imgHeadLine="images/pump/ban.webp"
        headLine="Ban Kempes di Tengah Jalan?"
        subHeadLine="Ribet Cari Tambal Ban?"
        rating="4.8"
        terjual="1.820"
      />
      <Content
        mainImage="images/pump/pompabiasa.webp"
        introText="Pompa Manual Bikin Tangan Capek & Pegal"
        secondText="KALAU IYA, ANDA TIDAK PERLU KHAWATIR LAGI!"
        secondImage="images/pump/pump1.webp"
        solution="dengan Pompa Elektrik, Anda tidak perlu lagi capek & pegal di hidup Anda lagi."
        productImages={productImages}
        testimonies={testimonies}
      />
      <Footer
        promoImages={["images/pel/diskon.webp", "images/pump/offer.webp"]}
        pixelId="1093785025490959"
        produkBaru={funnelProduct}
        footerImages={[
          "images/fotter2.webp",
          "images/sek.webp",
          "images/fotter.webp",
        ]}
        faqs={faqs}
      />
      <Floting/>
    </div>
  );
};

export default LandingPage;
