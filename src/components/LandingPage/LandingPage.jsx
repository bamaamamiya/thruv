import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";

const LandingPage = () => {
  const productImages = [
    "images/pel/gambar1.webp",
    "images/pel/newpics.webp",
    "images/pel/newpics1.webp",
    "images/pel/product4.webp",
    "images/pel/serap.webp",
    "images/pel/q.webp",
  ];

  const testimonies = [
    "images/pel/1.webp",
    "images/pel/2.webp",
    "images/pel/3.webp",
  ];

  const promoImages = ["images/pel/diskon.webp", "images/pel/99.webp"];

  const funnelProduct = {
    title: "Pel Tarik Anti Peras",
    description: "Bonus 1 kain Refill",
  };

  const faqs = [
    {
      question: "Apakah pel ini cocok untuk semua jenis lantai?",
      answer: "Iya! Cocok untuk keramik, kayu, marmer, hingga vinyl.",
    },
    {
      question: "Perlukah pakai tangan untuk peras airnya?",
      answer:
        "Tidak perlu! Sudah dilengkapi sistem peras otomatis tanpa sentuhan tangan.",
    },
    {
      question: "Apakah kain pel-nya bisa dicuci ulang?",
      answer:
        "Bisa! Kain pel bisa dicuci & dipakai berulang hingga puluhan kali.",
    },
  ];

  return (
    <div>
      <Headline
        imgHeadLine="images/pel/headline3.webp"
        headLine="Pel Tarik Anti Peras"
        subHeadLine="Solusi Mengepel tanpa pegal untuk bunda"
        rating="4.8"
        terjual="10.000"
      />
      <Content
        mainImage="images/pel/tangansakit.webp"
        introText="Tangan pegal & sakit karena memeras kain pel?"
        secondText="KALAU IYA, ANDA TIDAK PERLU KHAWATIR LAGI!"
        solution="Karena dengan Pel Anti Pegal, Anda tidak perlu lagi capek & pegal memeras kain pel di hidup Anda lagi."
        secondImage="images/pel/peraspel.webp"
        productImages={productImages}
        testimonies={testimonies}
        promoImages={promoImages}
      />
      <Footer
        promoImages={["images/pel/diskon.webp", "images/pel/99.webp"]}
        pixelId="1250623926188998"
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
