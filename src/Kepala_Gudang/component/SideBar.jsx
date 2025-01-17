import { useTheme } from "../../ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("dashboard"); // Menambahkan state untuk tombol aktif

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-400 hover:bg-blue-300";

  // Fungsi untuk menangani klik pada menu item
  const handleMenuClick = (route, buttonId) => {
    setActiveButton(buttonId);
    navigate(route);
  };

  // Fungsi untuk mendapatkan class button berdasarkan status aktif
  const getButtonClass = (buttonId) => {
    const baseClasses =
      "flex items-center space-x-3 p-3 rounded-md cursor-pointer";
    const activeClass = isDarkMode ? "bg-blue-600" : "bg-blue-400";
    const hoverClass = `hover:${buttonClasses}`;

    return `${baseClasses} ${
      activeButton === buttonId ? activeClass : ""
    } ${hoverClass}`;
  };

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen ${sidebarClasses} p-5 transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/50"
                alt="Admin Avatar"
                className="rounded-full w-12 h-12"
              />
              <h2 className="text-xl font-semibold">Kepala Gudang</h2>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>

        {/* Dark Mode Toggle */}
        {isSidebarOpen && (
          <div className="flex items-center justify-between my-10">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="toggle-checkbox hidden"
                checked={!isDarkMode}
                onChange={toggleTheme}
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner flex items-center">
                <div
                  className={`w-4 h-4 rounded-full shadow transform transition-transform ${
                    isDarkMode
                      ? "translate-x-1 bg-gray-800"
                      : "translate-x-6 bg-yellow-400"
                  }`}
                ></div>
              </div>
              <span className="text-sm">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </span>
            </label>
          </div>
        )}

        {/* Menu Items */}
        <ul className="space-y-4">
          <li
            className={getButtonClass("dashboard")}
            onClick={() => handleMenuClick("/kepalaGudang", "dashboard")}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              🏠
            </span>
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            className={getButtonClass("stock")}
            onClick={() =>
              handleMenuClick("/kepalaGudang/stockGudang", "stock")
            }
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              📦
            </span>
            {isSidebarOpen && <span>Stock Gudang</span>}
          </li>
          <li
            className={getButtonClass("barangMasuk")}
            onClick={() =>
              handleMenuClick("/kepalaGudang/addBarangMasuk", "barangMasuk")
            }
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              📋
            </span>
            {isSidebarOpen && <span>Tambah Barang Masuk</span>}
          </li>
          <li
            className={getButtonClass("barangKeluar")}
            onClick={() =>
              handleMenuClick("/kepalaGudang/addBarangKeluar", "barangKeluar")
            }
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              📋
            </span>
            {isSidebarOpen && <span>Barang Keluar</span>}
          </li>
          <li
            className={getButtonClass("retur")}
            onClick={() =>
              handleMenuClick("/kepalaGudang/returBarang", "retur")
            }
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              ↩️
            </span>
            {isSidebarOpen && <span>Retur Barang</span>}
          </li>
        </ul>

        {/* Logout Button */}
        <button
          className={`mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold hover:bg-pink-400`}
          onClick={() => navigate("/")}
        >
          {isSidebarOpen ? (
            "Keluar"
          ) : (
            <>
              <span
                className={`transform transition-all ${
                  isSidebarOpen ? "" : "ml-[-10px]"
                }`}
              >
                🚪
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
