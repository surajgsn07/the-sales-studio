import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs"; // Light/Dark mode icons
import { Link } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white dark:bg-black shadow-md">
      {/* Coupon Claimer Title */}
      <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
        🎟 Coupon Claimer
      </Link>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full cursor-pointer bg-gradient-to-r  from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
      >
        {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
      </button>
    </header>
  );
};

export default Header;
