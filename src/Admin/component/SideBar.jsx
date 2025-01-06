import { useTheme } from "../../ThemeContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("dashboard"); // Tambahkan state untuk tombol aktif

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-400 hover:bg-blue-300";

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (menuId, path) => {
    setActiveButton(menuId);
    navigate(path);
  };

  // Fungsi untuk mendapatkan class button berdasarkan status aktif
  const getButtonClass = (menuId) => {
    const baseClasses =
      "flex items-center space-x-3 p-3 rounded-md cursor-pointer";
    const activeClass = isDarkMode ? "bg-blue-600" : "bg-blue-400";
    const hoverClass = `hover:${buttonClasses}`;

    return `${baseClasses} ${
      activeButton === menuId ? activeClass : ""
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
        <div
          className="flex items-center justify-between"
          onClick={() => navigate("/admin/profileAdmin")}
        >
          <div className="flex items-center">
            {isSidebarOpen && (
              <img
                src="https://via.placeholder.com/50"
                alt="Admin Avatar"
                className="rounded-full w-12 h-12"
              />
            )}
            {isSidebarOpen && (
              <h2 className="text-xl font-semibold ml-3">Admin</h2>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
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
            onClick={() => handleMenuClick("dashboard", "/admin")}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              🏠
            </span>
            {isSidebarOpen && <span className="ml-3">Dashboard</span>}
          </li>
          <li
            className={getButtonClass("manage-karyawan")}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              handleMenuClick("manage-karyawan", "#");
            }}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              👥
            </span>
            {isSidebarOpen && <span className="ml-3">Manage Karyawan</span>}
          </li>
          {isDropdownOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li
                className={`p-2 rounded-md cursor-pointer ${
                  activeButton === "add-karyawan"
                    ? "bg-blue-400"
                    : "hover:bg-gray-300"
                }`}
                onClick={() =>
                  handleMenuClick("add-karyawan", "/admin/addKaryawan")
                }
              >
                Tambah Karyawan
              </li>
              <li
                className={`p-2 rounded-md cursor-pointer ${
                  activeButton === "list-karyawan"
                    ? "bg-blue-400"
                    : "hover:bg-gray-300"
                }`}
                onClick={() =>
                  handleMenuClick("list-karyawan", "/admin/manageKaryawan")
                }
              >
                Daftar Karyawan
              </li>
            </ul>
          )}
          <li
            className={getButtonClass("stock-gudang")}
            onClick={() =>
              handleMenuClick("stock-gudang", "/admin/stockGudang")
            }
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              📦
            </span>
            {isSidebarOpen && <span className="ml-3">Stock Gudang</span>}
          </li>
          <li
            className={getButtonClass("retur-barang")}
            onClick={() =>
              handleMenuClick("retur-barang", "/admin/returBarang")
            }
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              ↩️
            </span>
            {isSidebarOpen && <span className="ml-3">Retur Barang</span>}
          </li>
          <li
            className={getButtonClass("list-barang")}
            onClick={() => handleMenuClick("list-barang", "/admin/listBarang")}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              📋
            </span>
            {isSidebarOpen && <span className="ml-3">List Barang</span>}
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
