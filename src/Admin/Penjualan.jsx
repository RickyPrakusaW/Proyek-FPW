import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";

const Penjualan = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [penjualanData, setPenjualanData] = useState([]);
  const [loading, setLoading] = useState(true);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-400 hover:bg-blue-300";

  const handleBarang_keluar = () => {
    navigate("/Barang_keluar");
  };

  useEffect(() => {
    const fetchPenjualanData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/getPenjualan");
        if (response.data && Array.isArray(response.data)) {
          setPenjualanData(response.data); // Pastikan data adalah array
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching penjualan data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPenjualanData();
  }, []);

  if (loading) {
    return <div className={`min-h-screen flex ${themeClasses}`}>Loading...</div>;
  }

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      <div className={`flex-1 p-5 space-y-5 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${buttonClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Penjualan")}
          >
            <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000</p>
          </div>

          <div
            className={`${buttonClasses} p-5 rounded-md text-center`}
            onClick={handleBarang_keluar}
          >
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div className={`${buttonClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">0 Barang</p>
          </div>
        </div>

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
                {penjualanData.map((item, index) => (
                  <tr key={item.idPenjualan || index} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.namaBarang || "N/A"}</td>
                    <td className="p-3">{item.totalBarang || 0}</td>
                    <td className="p-3">Rp. {(item.hargaSatuan || 0).toLocaleString()}</td>
                    <td className="p-3">Rp. {(item.totalHarga || 0).toLocaleString()}</td>
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
