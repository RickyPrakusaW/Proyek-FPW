import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StockGudang = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const tableHeaderClasses = isDarkMode
    ? "bg-blue-600 text-white"
    : "bg-blue-300 text-gray-900";
  const tableRowClasses = isDarkMode
    ? "bg-gray-700 hover:bg-blue-700"
    : "bg-gray-100 hover:bg-blue-100";

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen ${sidebarClasses} p-5 transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/50"
                alt="Admin Avatar"
                className="rounded-full w-12 h-12"
              />
              <h2 className="text-xl font-semibold">Admin</h2>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>

        {/* Dark/Light Mode Toggle */}
        {isSidebarOpen && (
          <div className="mt-10">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!isDarkMode}
                onChange={toggleTheme}
                className="hidden"
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
        <ul className="mt-10 space-y-4">
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              isSidebarOpen ? "bg-blue-500" : ""
            }`}
            onClick={() => navigate("/Homeadmin")}
          >
            <span>🏠</span>
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/Managekariawan")}
          >
            <span>👥</span>
            {isSidebarOpen && <span>Manage Karyawan</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              isSidebarOpen ? "bg-blue-500" : ""
            }`}
          >
            <span>📦</span>
            {isSidebarOpen && <span>Stock Gudang</span>}
          </li>
          <li
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/Returadmin")}
          >
            <span>↩️</span>
            {isSidebarOpen && <span>Retur Barang</span>}
          </li>
          <li
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/List_barang_admin")}
          >
            <span>📋</span>
            {isSidebarOpen && <span>List Barang</span>}
          </li>
        </ul>

        {/* Logout Button */}
        <button
          className={`mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold hover:bg-pink-400`}
          onClick={() => navigate("/")}
        >
          {isSidebarOpen ? "Keluar" : "🚪"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Stock Di Gudang</h1>
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-md border border-gray-700 focus:outline-none text-black"
          />
        </div>

        {/* Tabel */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={`${tableHeaderClasses}`}>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Tanggal Masuk</th>
              <th className="p-3 border">Tanggal Keluar</th>
              <th className="p-3 border">Tipe Barang</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, index) => (
              <tr key={index} className={`${tableRowClasses}`}>
                <td className="p-3 border">00{index + 1}</td>
                <td className="p-3 border">Example</td>
                <td className="p-3 border">0</td>
                <td className="p-3 border">11 November 2024</td>
                <td className="p-3 border">11 November 2024</td>
                <td className="p-3 border">
                  {index % 3 === 0
                    ? "Tas Sekolah"
                    : index % 3 === 1
                    ? "Tas Anak"
                    : "Tas Canvas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockGudang;
