import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

function List_barang_kariawan() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-green-600 hover:bg-green-700"
    : "bg-green-500 hover:bg-green-600";

  return (
    <div className={`flex h-screen ${themeClasses}`}>
      {/* Main Content */}
      <div className={`w-3/4 p-6 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">List Barang</h1>

        {/* Product List */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-lg shadow p-4 flex flex-col items-center ${cardClasses}`}
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-blue-300 rounded-lg mb-4"></div>
              {/* Product Name */}
              <h2 className="text-lg font-bold">Barang {index + 1}</h2>
              {/* Product Details */}
              <p>Rp. 0</p>
              <p>Stock: 0</p>
              {/* Button */}
              <button className={`mt-4 px-4 py-2 text-white rounded-lg shadow ${buttonClasses}`}>
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List_barang_kariawan;