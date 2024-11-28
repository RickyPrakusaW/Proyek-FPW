import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function List_barang_admin() {
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
              isSidebarOpen ? buttonClasses : ""
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
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/Stockgudangadmin")}
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
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              isSidebarOpen ? buttonClasses : ""
            }`}
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
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">List Barang</h1>
          <div className="flex items-center space-x-4">
            <button
              className={`${buttonClasses} py-2 px-4 rounded`}
              onClick={() => navigate("/Tambah_barang_admin")}
            >
              + Tambah Barang
            </button>
            <input
              type="text"
              placeholder="Cari"
              className="border border-gray-300 py-2 px-4 rounded"
            />
          </div>
        </div>

        {/* Total Barang */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Total Barang: 8</p>
        </div>

        {/* Barang List */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`${isDarkMode ? "bg-gray-700" : "bg-blue-200"} text-center p-4 rounded shadow flex flex-col justify-between`}
            >
              {/* Barang Icon */}
              <div
                className={`w-full h-20 flex items-center justify-center ${
                  isDarkMode ? "bg-gray-600" : "bg-blue-300"
                } rounded mb-3`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-12 h-12 ${
                    isDarkMode ? "text-gray-300" : "text-blue-500"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v3.75"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10.5L12 16.5l9-6M3 10.5v6.75a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 17.25v-6.75"
                  />
                </svg>
              </div>
              {/* Barang Info */}
              <p className="font-bold">Barang {index + 1}</p>
              <p>Stock: 0</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                >
                  Ubah
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List_barang_admin;
