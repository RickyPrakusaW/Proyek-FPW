import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext"; 
import axios from "axios";

const StockGudang = () => {
  const { isDarkMode } = useTheme();
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Updated theme classes dengan warna teks yang konsisten
  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white shadow-lg"
    : "bg-gray-100 text-gray-900 shadow-md";

  const inputClasses = isDarkMode
    ? "p-2 rounded-md border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const titleClasses = isDarkMode
    ? "text-2xl font-bold text-white"
    : "text-2xl font-bold text-gray-900";

  const stockTextClasses = isDarkMode
    ? "text-sm text-gray-300"
    : "text-sm text-gray-600";

  const stockNumberClasses = isDarkMode
    ? "font-semibold text-white"
    : "font-semibold text-gray-900";

  const cardTitleClasses = isDarkMode
    ? "text-lg font-bold text-white"
    : "text-lg font-bold text-gray-900";

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

  // Filter stocks based on search query and total_barang > 0 (Only show stocks with quantity > 0)
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) &&
      stock.total_barang > 0 // Only include stocks with quantity > 0
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <h1 className={titleClasses}>Stock Di Gudang</h1>
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
            {/* ID Stock */}
            <h2 className={cardTitleClasses}>{stock.id_stock}</h2>
            {/* Nama Barang */}
            <h2 className={cardTitleClasses}>{stock.nama_barang}</h2>
            {/* Stock Barang */}
            <p className={stockTextClasses}>
              Jumlah: <span className={stockNumberClasses}>{stock.total_barang}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockGudang;
