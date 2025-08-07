import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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

      {/* Right - Store Brand */}
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-gray-800">Thruv Shop</p>
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
