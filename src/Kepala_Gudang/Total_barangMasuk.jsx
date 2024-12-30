import React, { useEffect, useState } from "react";
import { useTheme } from "./../ThemeContext";

const Homekepalagudang = () => {
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-blue-600 text-white p-5 rounded-md text-center cursor-pointer"
    : "bg-blue-300 text-black p-5 rounded-md text-center cursor-pointer";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-black";

  const [barangData, setBarangData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data dari backend
    const fetchStockData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getStock"); // Ganti URL dengan endpoint backend Anda
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal mengambil data");
        }

        setBarangData(result.data); // Mengatur data stock dari response
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Main Content */}
      <div className="flex-1 p-5 space-y-5">
        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-5">
              <div className={cardClasses}>
                <h3 className="text-xl font-semibold">Total Barang Masuk</h3>
                <p className="text-2xl font-bold">{barangData.length} Item</p>
              </div>
              <div className={cardClasses}>
                <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className={cardClasses}>
                <h3 className="text-xl font-semibold">Total Barang</h3>
                <p className="text-2xl font-bold">
                  {barangData.reduce(
                    (total, barang) => total + (barang.total_barang || 0),
                    0
                  )}{" "}
                  Item
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {barangData.map((barang) => (
                <div
                  key={barang._id} // Pastikan Anda menggunakan `_id` dari MongoDB
                  className={`p-5 rounded-md text-center ${sidebarClasses}`}
                >
                  <img
                    src={barang.photo_url || "https://via.placeholder.com/100"}
                    alt={barang.nama}
                    className="w-20 h-20 mx-auto rounded-md mb-3"
                  />
                  <h4 className="text-lg font-bold">{barang.nama}</h4>
                  <p className="text-sm">ID: {barang.id_barang}</p>
                  <p className="text-sm">Tipe: {barang.tipe_barang}</p>
                  <p className="text-sm">Jumlah: {barang.total_barang}</p>
                  <p className="text-sm">Tanggal Masuk: {barang.tanggal_masuk}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Homekepalagudang;
