// Navbar Component
function Navbar({ title, menuItems }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      {/* <ul className="hidden md:flex space-x-6">
        {menuItems.map((item, index) => (
          <li key={index} className="cursor-pointer text-gray-600 hover:text-black">
            {item}
          </li>
        ))}
      </ul> */}
    </nav>
  );
}

export default Navbar