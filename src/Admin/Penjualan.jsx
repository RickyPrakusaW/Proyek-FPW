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
