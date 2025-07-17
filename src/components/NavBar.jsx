// src/components/ThemeToggle.jsx
import React from "react";
import { useState } from "react";

import logo from "../assets/official/fakeChatLogo.webp";

export default function NavBar() {


  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-gradient-to-t from-[#006aff] to-[#00b2ff] px-4 py-2 text-white text-center shadow-xl rounded-full max-w-2xl mx-auto left-2 right-2 top-2 flex justify-between items-center">
      <span className="material-symbols-outlined">
        sort
      </span>

      <img src={logo} alt="Fake chat Logo" className="w-36 md:w-52 mx-auto" />

      <button
        onClick={toggleDarkMode}
        className="flex items-center w-8 h-8 justify-center rounded-full bg-white"
      >
        {isDarkMode ? (
          <span className="material-symbols-outlined text-xl text-[#00b2ff]">light_mode</span>
        ) : (
          <span className="material-symbols-outlined text-xl text-[#006aff]">moon_stars</span>
        )}
      </button>
    </nav>
  );
}
