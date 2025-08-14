import ProductCard from "./set/ProductCard";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      {/* Logo */}
      <div>
        <img
          src="images/thruv.jpg"
          className="w-28 h-28 object-cover mb-4 rounded-xl border"
        />
      </div>

      {/* Header & Deskripsi */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          SELAMAT DATANG DI THRUV SHOP
        </h1>
        <p className="text-base text-gray-700 max-w-xl mx-auto">
          Dapatkan{" "}
          <span className="font-bold">produk rumah tangga berkualitas</span>{" "}
          tanpa ribet dan tanpa mahal!{" "}
          <span className="font-bold">Thruv Shop</span> bikin belanja{" "}
          <span className="font-bold">cepat, gampang, dan amanah</span>. ⚡️
          Lihat <span className="font-bold">promo terbaik</span> kami sekarang
          sebelum <span className="font-bold">kehabisan</span> 👇
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        <ProductCard
          image="images/cctv/3.webp"
          name="SMART CCTV BULP (CCTV BOHLAM)"
          link="/cctv"
        />
      </div>
    </div>
  );
};

export default Page;
