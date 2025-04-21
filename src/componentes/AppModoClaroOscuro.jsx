import React from "react";
import "../assets/scss/_01-General/_AppModoClaroOscuro.scss";

const AppModoClaroOscuro = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      className={`theme-switcher-button ${isDarkMode ? "dark-mode" : "light-mode"}`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default AppModoClaroOscuro;
