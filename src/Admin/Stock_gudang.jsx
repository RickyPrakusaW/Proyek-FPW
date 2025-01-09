import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import { SearchIcon } from "lucide-react";

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
    ? "p-4 pl-12 text-lg rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white w-full sm:w-96 md:w-[480px] lg:w-[640px] transition-all duration-300"
    : "p-4 pl-12 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full sm:w-96 md:w-[480px] lg:w-[640px] transition-all duration-300";
  const textClasses = isDarkMode ? "text-white" : "text-gray-900";
  const searchIconClasses = isDarkMode ? "text-gray-400" : "text-gray-500";

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
      {/* Header with larger search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-6">
        <h1 className={`text-3xl font-bold ${textClasses}`}>Stock Di Gudang</h1>
        <div className="relative w-full sm:w-auto">
          <SearchIcon 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 ${searchIconClasses}`}
          />
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {filteredStocks.map((stock, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden flex flex-col items-center p-5 ${cardClasses} hover:shadow-xl transition-shadow duration-300`}
          >
            <img
              src={stock.photo_url}
              alt={stock.nama_barang}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className={`text-lg font-bold mb-2 ${textClasses}`}>
              {stock.nama_barang}
            </h2>
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