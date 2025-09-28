import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";

const MassageGun = () => {
  const productImages = ["images/pijat/1.webp", "images/pijat/2.webp"];

  const testimonies = [
    "images/pijat/testi1.webp",
    "images/pijat/testi2.webp",
    "images/pijat/testi3.webp",
  ];

  const funnelProduct = {
    title: "Alat Pijat Elektrik",
    description: "Alat Pijat 4 in 1",
    price: 149000,
  };

  const bundles = [
    {
      id: "mg-basic",
      title: "Massage Gun (biasa)",
      price: 149000,
      badge: null,
      features: ["1 Set Massage Gun 4-in-1"],
    },
    {
      id: "mg-premium",
      title: "Massage Gun 4-in-1 Premium Bundle",
      price: 299000,
      badge: "Penawaran Terbaik",
      features: [
        "1x Massage Gun 4-in-1 Premium",
        "6 Kepala Pijat (4 standar + 2 bonus)",
        "8 Level Kecepatan + Mode Panas",
        "Baterai Tahan 6 Jam",
        "Bonus Ebook Recovery",
        "Garansi 1 Tahun",
      ],
    },
  ];

  const faqs = [
    {
      question: "Aman digunakan setiap hari?",
      answer:
        "Aman, selama digunakan sesuai kebutuhan dan tidak berlebihan. Alat ini dirancang untuk penggunaan rutin.",
    },
    {
      question: "Apakah alat ini pakai listrik terus menerus?",
      answer:
        "Tidak, alat ini menggunakan baterai rechargeable. Sekali charge bisa dipakai beberapa sesi.",
    },
    {
      question: "Berapa lama waktu charge pertama kali?",
      answer: "Disarankan charge selama 3 jam sebelum digunakan pertama kali.",
    },
    {
      question: "Berapa banyak mode pijatan?",
      answer:
        "Terdapat 6 tingkat kecepatan yang bisa kamu sesuaikan dengan kebutuhan.",
    },
    {
      question: "Apa alat ini bisa untuk semua bagian tubuh?",
      answer:
        "Ya, dilengkapi 4 kepala pijat dengan fungsi berbeda: cocok untuk punggung, leher, kaki, hingga lengan.",
    },
  ];

  const problems = [
    "Otot sering tegang dan pegal setelah olahraga atau kerja seharian.",
    "Susah tidur karena punggung terasa kaku.",
    "Terbatas waktu & biaya untuk pijat ke tempat terapi.",
    "Pijat biasa kurang dalam dan tidak menjangkau titik nyeri.",
  ];

  const solutions = [
    "Pijat otot kapan saja, langsung dari rumah.",
    "6 level kecepatan, cocok untuk relaksasi ringan atau terapi otot intens.",
    "4 kepala pijat berbeda: sesuaikan dengan bagian tubuh & tingkat nyeri.",
    "Tanpa kabel ribet, cukup isi ulang baterai.",
    "Desain seperti pistol, ergonomis & mudah digunakan sendiri.",
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
  const hargaNormal = getNormalPrice(bundles[0].price, discount);

  const discountTransfer = true; // 🔥 tinggal ubah true/false

  return (
    <div>
      <Headline
        imgHeadLine="images/pijat/headline.webp"
        headLine="Sering pegal, nyeri otot, atau badan kaku setelah aktivitas berat?"
        subHeadLine="Tapi bingung gak sempat ke tempat pijat atau terlalu mahal?"
        problemTitle="💆 Masalah yang Sering Dialami Banyak Orang:"
        problems={problems}
      />
      <Content
        solutionTitle="Bayangin setelah kerja seharian, kamu bisa langsung pijat otot sendiri di rumah. Badan jadi ringan, tidur pun lebih nyenyak 😌"
        solutions={solutions}
        mainImage="images/pijat/3.webp"
        productImages={productImages}
        testimonies={testimonies}
      />

      {/* <Footer
        hargaJual={funnelProduct.price}
        pixelId="2588889891453558"
        produkBaru={funnelProduct}
        footerImages={["images/fotter2.webp", "images/fotter.webp"]}
        faqs={faqs}
        namaProduct={funnelProduct.title}
        NormalPrice={hargaNormal}
        discountTransfer={discountTransfer} // ⬅ lempar ke Footer
      /> */}
      <Footer
        hargaJual={bundles[0].price}
        pixelId="2588889891453558"
        produkBaru={bundles}
        footerImages={["images/fotter2.webp", "images/fotter.webp"]}
        bundles={bundles}
        faqs={faqs}
        namaProduct="Massage Gun 4 in 1"
        NormalPrice={hargaNormal} // <-- FIX
				discountTransfer={discountTransfer}
      />

      <Floting />
    </div>
  );
};

export default MassageGun;
