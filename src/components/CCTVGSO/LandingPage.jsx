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
    title: "CCTV Bundles",
    description: "CCTV Bundles",
    price: 234000,
    costProduct: 146000,
  };

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
    {
      question: "Kalau barang rusak atau cacat gimana?",
      answer:
        "Ada Garansi Tukar Baru. Cukup kasih video unboxing + foto paket, langsung kami proses.",
    },
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
    "Instalasi cuma 2 menit — tinggal pasang di fitting lampu, CCTV langsung aktif & terhubung ke HP",
    "Support night vision, jadi tetap bisa ngawasin rumah meskipun malam atau lampu mati.",
  ];

const valueItems = [
  { 
    title: "🎥 CCTV Smarthome Pro", 
    detail: "Pantau rumah kapan saja, dari mana saja dengan kualitas HD", 
    value: 249000 
  },
  { 
    title: "🎁 Bonus #1: Gratis Potongan Ongkir", 
    detail: "Hemat biaya kirim ke seluruh Indonesia", 
    value: 30000 
  },
  { 
    title: "🔧 Bonus #2: Fitting & Baut Lengkap", 
    detail: "Langsung bisa dipasang tanpa keluar biaya tambahan", 
    value: 20000 
  },
  { 
    title: "💾 Bonus #3: Memori 32GB Rekaman", 
    detail: "Simpan rekaman hingga ratusan jam, tanpa beli tambahan", 
    value: 85000 
  },
  { 
    title: "📱 Bonus #4: Akses App Premium", 
    detail: "Kontrol CCTV dari HP dengan fitur premium", 
    value: 150000 
  },
  { 
    title: "✅ Garansi Ganti Baru 1 Tahun", 
    detail: "Rusak? Langsung diganti unit baru tanpa ribet", 
    value: null
  },
];


  const pixel = 2111198546014232;
  const pixelString = pixel.toString();
  const sumValues = (items) => {
    return items.reduce((acc, item) => acc + item.value, 0);
  };
	
  const totalValue = sumValues(valueItems);

  const discountTransfer = false; // 🔥 tinggal ubah true/false

  return (
    <div className="bg-white">
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
        pixelId={pixelString}
        produkBaru={funnelProduct}
        footerImages={["images/fotter2.webp", "images/fotter.webp"]}
        faqs={faqs}
        namaProduct={funnelProduct.title}
        values={valueItems}
        totalValue={totalValue} // otomatis dari promo + diskon
        discountTransfer={discountTransfer} // ⬅ lempar ke Footer
      />
      <Floting />
    </div>
  );
};

export default CctvBohlam;
