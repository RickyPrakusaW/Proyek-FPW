import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext"; 
import axios from "axios";

const StockGudang = () => {
  const { isDarkMode } = useTheme();
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white shadow-lg"
    : "bg-white text-gray-900 shadow-md";
  const inputClasses = isDarkMode
    ? "p-2 rounded-md border border-gray-700 focus:outline-none bg-gray-700 text-white"
    : "p-2 rounded-md border border-gray-300 focus:outline-none bg-white text-gray-900";
  const textClasses = isDarkMode ? "text-white" : "text-gray-900";

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/getStock");
        setStocks(response.data.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchStockData();
  }, []);

  const filteredStocks = stocks.filter((stock) =>
    stock.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <h1 className={`text-2xl font-bold ${textClasses}`}>Stock Di Gudang</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className={inputClasses}
        />
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {filteredStocks.map((stock, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden flex flex-col items-center p-5 ${cardClasses}`}
          >
            {/* Image */}
            <img
              src={stock.photo_url}
              alt={stock.nama_barang}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            {/* Nama Barang */}
            <h2 className={`text-lg font-bold mb-2 ${textClasses}`}>
              {stock.nama_barang}
            </h2>
            {/* Stock Barang */}
            <p className={`text-sm ${textClasses}`}>
              Jumlah: <span className="font-semibold">{stock.total_barang}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockGudang;
