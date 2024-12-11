import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

function Keranjang() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const buttonClasses = isDarkMode
    ? "text-gray-400 hover:text-blue-300"
    : "text-gray-600 hover:text-blue-600";
  const tableHeaderClasses = isDarkMode
    ? "bg-gray-700 text-white"
    : "bg-blue-500 text-white";
  const tableRowClasses = isDarkMode
    ? "bg-gray-800 hover:bg-gray-700"
    : "bg-blue-100 hover:bg-blue-200";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";

  return (
    <div className={`flex h-screen ${themeClasses}`}>
      {/* Main Content */}
      <main className={`flex-1 p-6 ${themeClasses}`}>
        <div className={`p-4 shadow-md rounded-lg ${cardClasses}`}>
          <h1 className="text-2xl font-bold">Keranjang</h1>
          <table className="w-full mt-4 text-center border-collapse">
            <thead className={tableHeaderClasses}>
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">ID Barang</th>
                <th className="px-4 py-2 border">Nama Barang</th>
                <th className="px-4 py-2 border">Jumlah</th>
                <th className="px-4 py-2 border">Foto</th>
                <th className="px-4 py-2 border">Harga</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <tr key={index} className={tableRowClasses}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">00{index + 1}</td>
                  <td className="px-4 py-2 border">Example</td>
                  <td className="px-4 py-2 border flex items-center justify-center space-x-2">
                    <button className="px-2 py-1 bg-red-500 text-white rounded">-</button>
                    <span>0</span>
                    <button className="px-2 py-1 bg-green-500 text-white rounded">+</button>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="w-12 h-12 bg-gray-200"></div>
                  </td>
                  <td className="px-4 py-2 border">Rp. 0</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Total Penjualan: Rp. 0</h2>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => navigate("/karyawan/checkOut")}
            >
              Proses
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Keranjang;