import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const Penjualan = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-400 hover:bg-blue-300";

  const dummyData = [
    { id: 1, name: "Produk A", qty: 10, price: 20000, total: 200000 },
    { id: 2, name: "Produk B", qty: 5, price: 50000, total: 250000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
    { id: 3, name: "Produk C", qty: 2, price: 100000, total: 200000 },
  ];
  const handleBarang_keluar = () => {
    navigate("/Barang_keluar");
  };

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Sidebar */}
      <div
        className={`fixed ${
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
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${buttonClasses}`}
            onClick={() => navigate("/Homeadmin")}
          >
            <span>🏠</span>
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:${buttonClasses}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>👥</span>
            {isSidebarOpen && <span>Manage Karyawan</span>}
          </li>
          {isDropdownOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li
                className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
                onClick={() => navigate("/Tambahkariawan")}
              >
                Tambah Karyawan
              </li>
              <li
                className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
                onClick={() => navigate("/ViewEmployees")}
              >
                Daftar Karyawan
              </li>
            </ul>
          )}
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:${buttonClasses}`}
            onClick={() => navigate("/Stockgudangadmin")}
          >
            <span>📦</span>
            {isSidebarOpen && <span>Stock Gudang</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:${buttonClasses}`}
            onClick={() => navigate("/Returadmin")}
          >
            <span>↩️</span>
            {isSidebarOpen && <span>Retur Barang</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:${buttonClasses}`}
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
      <div className={`flex-1 p-5 space-y-5 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Statistik Utama */}
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${buttonClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Penjualan")}
          >
            <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000</p>
          </div>

          <div className={`${buttonClasses} p-5 rounded-md text-center`} onClick={handleBarang_keluar}>
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div className={`${buttonClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">0 Barang</p>
          </div>
        </div>

        {/* Data Dummy Penjualan */}
        <div className={`${sidebarClasses} p-5 rounded-md`}>
          <h3 className="text-xl font-semibold mb-5">Data Penjualan</h3>
          <div className="overflow-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3">No</th>
                  <th className="p-3">Nama Barang</th>
                  <th className="p-3">Jumlah</th>
                  <th className="p-3">Harga Satuan</th>
                  <th className="p-3">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.qty}</td>
                    <td className="p-3">Rp. {item.price.toLocaleString()}</td>
                    <td className="p-3">Rp. {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penjualan;
