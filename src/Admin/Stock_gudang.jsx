import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext"; 
import axios from "axios";

const StockGudang = () => {
  const { isDarkMode } = useTheme();
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // State untuk query pencarian

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white shadow-lg"
    : "bg-white text-gray-900 shadow-md";
  const inputClasses = isDarkMode
    ? "p-2 rounded-md border border-gray-700 text-black focus:outline-none"
    : "p-2 rounded-md border border-gray-300 text-black focus:outline-none";

  // Fetch data from backend
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/getStock");
        setStocks(response.data.data); // Assuming `data` is the key for the stock array
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchStockData();
  }, []);

  // Filtered stocks based on search query
  const filteredStocks = stocks.filter((stock) =>
    stock.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle change in search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold">Stock Di Gudang</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}  // Bind value to searchQuery state
          onChange={handleSearchChange}  // Update state when input changes
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
              src={stock.photo_url}  // Gunakan URL gambar dari API response
              alt={stock.nama_barang}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            {/* Nama Barang */}
            <h2 className="text-lg font-bold mb-2">{stock.nama_barang}</h2>
            {/* Stock Barang */}
            <p className="text-sm text-gray-500">
              Jumlah: <span className="font-semibold">{stock.total_barang}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockGudang;
  