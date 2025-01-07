import { useTheme } from "../../ThemeContext";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(""); // State untuk menu aktif

  // New state for storing the logged-in user's data
  const [userData, setUserData] = useState({
    nama_lengkap: "",
    foto_ktp: "",
  });

  // Get data from localStorage (or from the backend response directly)
  useEffect(() => {
    // Assuming you store the user data in localStorage after login
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData({
        nama_lengkap: user.nama_lengkap,
        foto_ktp: user.foto_ktp,
      });
    }
  }, []);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-400 hover:bg-blue-300";

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen ${sidebarClasses} p-5 transition-all duration-300`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          onClick={() => navigate("/karyawan")}
        >
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <img
                src={userData.foto_ktp || "https://via.placeholder.com/50"}
                alt="Profile"
                className="rounded-full w-12 h-12"
              />
              <h2 className="text-xl font-semibold">{userData.nama_lengkap}</h2>
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
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              activeMenu === "listBarang" ? buttonClasses : "hover:" + buttonClasses
            }`}
            onClick={() => {
              setActiveMenu("listBarang");
              navigate("/karyawan/listBarang");
            }}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              🏠
            </span>
            {isSidebarOpen && <span>List Barang</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              activeMenu === "keranjang" ? buttonClasses : "hover:" + buttonClasses
            }`}
            onClick={() => {
              setActiveMenu("keranjang");
              navigate("/karyawan/keranjang");
            }}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              📦
            </span>
            {isSidebarOpen && <span>Keranjang</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              activeMenu === "cekStockGudang" ? buttonClasses : "hover:" + buttonClasses
            }`}
            onClick={() => {
              setActiveMenu("cekStockGudang");
              navigate("/karyawan/cekStockGudang");
            }}
          >
            <span
              className={`transform transition-all ${
                isSidebarOpen ? "" : "ml-[-10px]"
              }`}
            >
              ↩️
            </span>
            {isSidebarOpen && <span>Cek Stock Gudang</span>}
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
            <span
              className={`transform transition-all ${isSidebarOpen ? "" : "ml-[-10px]"}`}
            >
              🚪
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
