import Content from "./Content";
import Headline from "./Headline";
import Footer from "./Footer";
import Floting from "../set/Floting";

const CatokASL = () => {
  const productImages = ["images/catokan/5.webp", "images/catokan/1.webp"];

  const testimonies = [
    "images/catokan/testi1.webp",
    "images/catokan/testi2.webp",
    "images/catokan/testi3.webp",
  ];

  const funnelProduct = {
    title: "Catokan 2 in 1",
    description: "Catokan Lurus & Curly Sekali Jepit",
    price: 149000,
    costProduct: 59000,
    useOngkir: false,
  };

  const faqs = [
    {
      question: "Apakah catokan ini bikin rambut rusak?",
      answer:
        "Tidak. Catokan ini menggunakan plate halus dengan panas stabil, jadi rambut tetap lembut dan tidak ketarik atau patah.",
    },
    {
      question: "Bisa untuk rambut tebal atau keriting?",
      answer:
        "Bisa! Cocok untuk rambut lurus, bergelombang, sampai keriting. Tinggal atur teknik jepitnya.",
    },
    {
      question: "Berapa lama panasnya?",
      answer:
        "Cepat! Dalam hitungan menit sudah siap dipakai, cocok buat yang sering buru-buru.",
    },
    {
      question: "Bisa lurus dan curly?",
      answer:
        "Bisa dua-duanya. Desain 2 in 1 memudahkan styling tanpa perlu ganti alat.",
    },
    {
      question: "Aman gak kalau transfer dulu?",
      answer:
        "Aman 100%! Rekening resmi & ada garansi tukar baru jika produk bermasalah.",
    },
  ];

  const problems = [
    "Setiap mau keluar rumah harus berantem dulu sama rambut sendiri",
    "Udah dandan rapi, tapi rambut bikin kesel dan nurunin rasa pede",
    "Catokan lama makan waktu, hasilnya tetap gak konsisten",
    "Kalau buru-buru, rambut asal jadi dan kelihatan berantakan",
    "Ke salon mahal, tapi harus diulang terus tiap mau tampil rapi",
  ];

  const solutions = [
    "Desain 2 in 1 bikin kamu bisa lurus atau curly tanpa ganti alat",
    "Plate halus bikin panas merata, rambut rapi tanpa ketarik",
    "Pemanasan cepat bikin styling bisa selesai dalam beberapa menit",
    "Kontrol mudah, jadi hasil rapi meski tanpa pengalaman",
    "Dipakai dari rumah tapi hasilnya kelihatan profesional",
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
  const hargaNormal = getNormalPrice(funnelProduct.price, discount);

  const discountTransfer = false; // 🔥 tinggal ubah true/false
  const extraOffer = "+ Gratis Ongkir";
  const extraPush =
    "Harga segini biasanya cuma dapat catokan biasa. Di sini kamu dapat alat styling 2 in 1 yang bisa dipakai bertahun-tahun.";

  return (
    <div className="bg-white">
      <Headline
        imgHeadLine="images/catokan/6.webp"
        headLine="Dapatkan Rambut rapi dan cantik kayak habis salon, cukup 5 menit dari rumah"
        subHeadLine="Catokan 2 in 1 bikin rambut lurus atau curly langsung jadi tanpa skill khusus, tanpa alat tambahan"
        problemTitle="💇‍♀️ Masalah Rambut yang Sering Bikin Gak Nyaman:"
        problems={problems}
      />

      <Content
        solutionTitle="Bayangin tiap pagi kamu gak perlu ribet mikirin rambut. Cukup colok, jepit sebentar, lalu rambut langsung rapi mau lurus atau curly sesuai keinginan. Semua bisa kamu lakukan dari rumah, tanpa ke salon, tanpa alat ribet, tanpa buang waktu."
        solutions={solutions}
        mainImage="images/catokan/2.webp"
        productImages={productImages}
        testimonies={testimonies}
      />

      <Footer
        hargaJual={funnelProduct.price}
        pixelId={pixelString}
        produkBaru={funnelProduct}
        footerImages={["images/fotter2.webp"]}
        faqs={faqs}
        namaProduct={funnelProduct.title}
        NormalPrice={hargaNormal}
        discountTransfer={discountTransfer} // ⬅ lempar ke Footer
        extraOffer={extraOffer}
        extraPush={extraPush}
        useOngkir={funnelProduct.useOngkir} // ✅ TERUSKAN
      />
      <Floting />
    </div>
  );
};

export default CatokASL;
