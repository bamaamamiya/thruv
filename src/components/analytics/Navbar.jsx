import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="text-white w-full bg-black border-b border-gray-200 px-4 py-4 flex justify-between items-center shadow-sm top-0 sticky">
      {/* Left: Order Button */}
      <button
        onClick={() => navigate("/order")}
        className="text-sm font-semibold  transition"
      >
        Order
      </button>

      {/* Right: Store Name */}
      <div className="pl-2 rounded-xl font-bold flex items-center gap-2 bg-blackto text-sm">
        <p>Thruv Shop</p>
        <img src="images/thruv.jpg" className="w-10 h-10 rounded-xl" />
      </div>
    </nav>
  );
};

export default Navbar;
