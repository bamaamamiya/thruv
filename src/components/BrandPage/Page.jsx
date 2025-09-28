import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Testimoni from "./Testimoni";
import Footer from "./Footer";
// Parent Component
function ProductPage() {
  const HeroImage = [
    "https://i.pinimg.com/736x/43/a2/1e/43a21e9ee028b87d54eda4169fd10861.jpg",
    "https://i.pinimg.com/736x/1b/62/a4/1b62a4704865545859f5737d22827719.jpg",
  ];
  const funnelProduct = {
    title: "Cup",
    product: "CUPSY – Fun, Everyday & Affordable!",
    price: 99000,
    costProduct: 75000,
    exclusive: "Cup",
    description:
      "Material food grade aman untuk minuman, kapasitas ± 500 ml, ringan dan tahan panas/dingin",
    features: [
      "Material food grade berkualitas tinggi",
      "Kapasitas ± 500 ml",
      "Ringan, tahan panas & dingin",
      "Desain ergonomis mudah digenggam",
    ],
  };

  const productDetails = {
    Kapasitas: "± 500 ml",
    Tinggi: "± 14 cm",
    "Diameter Atas": "± 9 cm",
    Material: "Food Grade Plastic",
    Berat: "± 120 gram",
    Warna: "Transparan / Custom",
  };

  const testimonials = [
    {
      name: "Rudi Suryanto",
      profile: "https://i.pravatar.cc/100?img=1",
      stars: "⭐⭐⭐⭐⭐",
      review: "Jamnya keren banget, strap nyaman dipakai dan tahan air.",
      image:
        "https://i.pinimg.com/736x/43/a2/1e/43a21e9ee028b87d54eda4169fd10861.jpg",
    },
    {
      name: "Dewi Anggraini",
      profile: "https://i.pravatar.cc/100?img=2",
      stars: "⭐⭐⭐⭐",
      review: "Model elegan, cocok buat acara formal maupun santai.",
      image:
        "https://i.pinimg.com/736x/43/a2/1e/43a21e9ee028b87d54eda4169fd10861.jpg",
    },
    {
      name: "Budi Santoso",
      profile: "https://i.pravatar.cc/100?img=3",
      stars: "⭐⭐⭐⭐⭐",
      review: "Harga terjangkau tapi kualitas mewah!",
      image:
        "https://i.pinimg.com/736x/43/a2/1e/43a21e9ee028b87d54eda4169fd10861.jpg",
    },
  ];

  function getNormalPrice(sellingPrice, discountRate) {
    if (discountRate >= 1 || discountRate < 0) {
      throw new Error("Discount rate harus antara 0 dan 1");
    }
    return sellingPrice / (1 - discountRate);
  }
  const discount = 0.5; // 50%
  const hargaNormal = getNormalPrice(funnelProduct.price, discount);

  const pixel = 12345678;
  const pixelString = pixel.toString();

  const discountTransfer = false; // 🔥 tinggal ubah true/false

  return (
    <div className="space-y-2 h-screen">
      <Navbar title="CUPSY" />

      <Hero
        image={HeroImage}
        title={funnelProduct.title}
        description={funnelProduct.description}
        price={funnelProduct.price}
        oldPrice={hargaNormal}
        features={funnelProduct.features}
        details={productDetails}
        exclusive={funnelProduct.exclusive}
      />
      <Testimoni testimonials={testimonials} />
      <Footer
        pixelId={pixelString}
        produkBaru={funnelProduct}
        namaProduct={funnelProduct.title}
        NormalPrice={hargaNormal}
        discountTransfer={discountTransfer}
        buttonColor="bg-green-500"
        buttonHoverColor="hover:bg-green-600"
      />
    </div>
  );
}

export default ProductPage;
