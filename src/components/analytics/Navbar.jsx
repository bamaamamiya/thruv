import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ 1. Tambahkan state untuk menyimpan teks brand
  const [isThruvShop, setIsThruvShop] = useState(true);

  // ✅ 2. Fungsi untuk mengubah state (toggle)
  const toggleStoreName = () => {
    setIsThruvShop(!isThruvShop);
  };

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Left Nav */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/order")}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition"
        >
          Orders
        </button>
      </div>

      {/* Right - Store Brand as a Button */}
      {/* ✅ 3. Tambahkan onClick handler ke div */}
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={toggleStoreName}
      >
        {/* ✅ 4. Tampilkan teks berdasarkan state */}
        <p className="text-sm font-semibold text-gray-800">
          {isThruvShop ? "Thruv Shop" : "My Store"}
        </p>
        <img
          src="images/thruv.jpg"
          alt="Store Logo"
          className="w-8 h-8 rounded-md object-cover border border-gray-200"
        />
      </div>
    </nav>
  );
};

export default Navbar;