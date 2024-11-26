import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const HomeAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

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
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Header */}
      <div className={`flex justify-between items-center p-5 ${sidebarClasses}`}>
        <h1 className="text-xl font-bold">Home Page (Admin)</h1>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`w-1/4 ${sidebarClasses} p-5`}>
          <div className="flex items-center space-x-3 mb-10">
            <img
              src="https://via.placeholder.com/50"
              alt="Admin Avatar"
              className="rounded-full w-12 h-12"
            />
            <h2 className="text-xl font-semibold">Admin</h2>
          </div>
          <div className="flex items-center justify-between mb-10">
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
          <ul className="space-y-4">
            <li
              className={`${buttonClasses} p-3 rounded-md cursor-pointer`}
              onClick={() => navigate("/Homeadmin")}
            >
              Dashboard
            </li>
            <li
              onClick={() => navigate("/Managekariawan")}
              className={`p-3 hover:${buttonClasses} rounded-md cursor-pointer`}
            >
              Manage Karyawan
            </li>
            <li
              onClick={() => navigate("/Stockgudangadmin")}
              className={`p-3 hover:${buttonClasses} rounded-md cursor-pointer`}
            >
              Stock Gudang
            </li>
            <li
              onClick={() => navigate("/Returadmin")}
              className={`p-3 hover:${buttonClasses} rounded-md cursor-pointer`}
            >
              Retur Barang
            </li>
            <li
              onClick={() => navigate("/List_barang_admin")}
              className={`p-3 hover:${buttonClasses} rounded-md cursor-pointer`}
            >
              List Barang
            </li>
          </ul>
          <button
            className={`mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold hover:bg-pink-400`}
            onClick={() => navigate("/")}
          >
            Keluar
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          <div className="grid grid-cols-3 gap-5">
            <div className={`${buttonClasses} p-5 rounded-md text-center`}>
              <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
              <p className="text-2xl font-bold">Rp. 1.000.000</p>
            </div>
            <div className={`${buttonClasses} p-5 rounded-md text-center`}>
              <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
              <p className="text-2xl font-bold">1000</p>
            </div>
            <div className={`${buttonClasses} p-5 rounded-md text-center`}>
              <h3 className="text-xl font-semibold">Total Barang</h3>
              <p className="text-2xl font-bold">0 Barang</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className={`${sidebarClasses} p-5 rounded-md`}>
              <h3 className="text-xl font-semibold mb-3">Penjualan Bulanan</h3>
              <div className="relative w-full h-48 bg-blue-200 rounded-md"></div>
            </div>

            <div className={`${sidebarClasses} p-5 rounded-md`}>
              <h3 className="text-xl font-semibold mb-3">Stock Tipe Barang</h3>
              <div className="relative w-full h-48 bg-blue-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
