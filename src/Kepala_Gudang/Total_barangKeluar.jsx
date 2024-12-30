import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

const Homekepalagudang = () => {
  const { isDarkMode } = useTheme();
  const [barangData, setBarangData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/barangKeluar"); // Endpoint backend
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal mengambil data barang");
        }

        setBarangData(result.data); // Set data barang keluar dari backend
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarangData();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } flex flex-col p-5 transition-colors duration-300`}
    >
      {/* Main Content Section */}
      <div className="flex-1 p-5 space-y-5">
        {/* Cards Section */}
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
            } p-5 rounded-md text-center`}
          >
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">
              {barangData.reduce(
                (total, barang) => total + (barang.total_barang || 0),
                0
              )}{" "}
              Karung
            </p>
          </div>
          <div
            className={`${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
            } p-5 rounded-md text-center`}
          >
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">{barangData.length} Barang</p>
          </div>
        </div>

        {/* Barang Cards Section */}
        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {barangData.map((barang, index) => (
              <div
                key={barang.Id_barang_keluar || index} // Use unique ID for key
                className={`${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                } p-5 rounded-md text-center transition-colors`}
              >
                <h4 className="text-lg font-bold">{barang.Nama_barang}</h4>
                <p className="text-sm">ID: {barang.Id_barang_keluar}</p>
                <p className="text-sm">Tipe: {barang.Tipe_barang}</p>
                <p className="text-sm">Jumlah: {barang.Total_barang} Karung</p>
                <p className="text-sm">Tanggal Keluar: {barang.Tanggal_keluar}</p>
                {/* Optionally, display a photo */}
                {barang.Photo_barang_keluar && (
                  <img
                    src={barang.Photo_barang_keluar}
                    alt={barang.Nama_barang}
                    className="mt-2 w-full h-auto rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homekepalagudang;
