import React, { useEffect, useState } from "react";
import { useTheme } from "./../ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios diimpor

const ReturAdmin = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // State untuk menyimpan data retur barang
  const [returData, setReturData] = useState([]);

  // Mengambil data dari backend saat komponen dimuat
  useEffect(() => {
    const fetchReturData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/getReturGudang"); // URL endpoint backend
        setReturData(response.data.data); // Menyimpan data retur di state
      } catch (error) {
        console.error("Error fetching retur data:", error);
      }
    };

    fetchReturData();
  }, []);

  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const tableHeaderClasses = isDarkMode ? "bg-blue-600 text-white" : "bg-blue-300 text-black";
  const tableRowClasses = isDarkMode ? "hover:bg-blue-700 bg-gray-700" : "hover:bg-blue-400 bg-gray-200";
  const buttonAddClasses = isDarkMode ? "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" : "bg-green-300 text-black px-4 py-2 rounded hover:bg-green-400";
  const buttonReturnClasses = isDarkMode ? "bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600" : "bg-green-300 px-4 py-2 text-black rounded-md hover:bg-green-400";

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Main Content */}
      <div className="flex-1 p-5 mx-auto w-4/5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Retur Barang</h1>
          <button className={buttonAddClasses} onClick={() => navigate("/kepalagudang/addBarangRetur")}>
            + Barang
          </button>
        </div>

        {/* Tabel */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={tableHeaderClasses}>
              <th className="p-3 border">No</th>
              <th className="p-3 border">ID Barang</th>
              <th className="p-3 border">Nama Barang</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Tanggal</th>
              <th className="p-3 border">Foto Barang</th>
            </tr>
          </thead>
          <tbody>
            {returData.map((retur, index) => (
              <tr key={retur.idReturGudang} className={`${tableRowClasses} border`}>
                <td className="p-3 border">{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                <td className="p-3 border">{retur.idBarang}</td>
                <td className="p-3 border">{retur.namaBarang}</td>
                <td className="p-3 border">{retur.jumlahBarang}</td>
                <td className="p-3 border">{new Date(retur.tanggal).toLocaleDateString()}</td>
                <td className="p-3 border">
                  <div className="flex justify-center">
                    <img
                      src={`http://localhost:3000/api/admin/uploads/stock/${retur.photoBarang}`}
                      alt="Barang"
                      className="w-10 h-10"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 flex justify-end">
          <button className={buttonReturnClasses}>Retur Barang</button>
        </div>
      </div>
    </div>
  );
};

export default ReturAdmin;
