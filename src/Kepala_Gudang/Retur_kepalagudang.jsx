import React, { useEffect, useState } from "react";
import { useTheme } from "./../ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReturAdmin = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [returData, setReturData] = useState([]);

  useEffect(() => {
    const fetchReturData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/getReturGudang");
        setReturData(response.data.data);
      } catch (error) {
        console.error("Error fetching retur data:", error);
      }
    };

    fetchReturData();
  }, []);

  const handleApprove = async (idReturGudang) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/updateStatusRetur/${idReturGudang}`, {
        status: "approved",
      });

      const response = await axios.get("http://localhost:3000/api/admin/getReturGudang");
      setReturData(response.data.data);
    } catch (error) {
      console.error("Error approving retur:", error);
    }
  };

  // Theme classes dengan warna teks yang konsisten
  const themeClasses = isDarkMode 
    ? "bg-gray-900 text-white" 
    : "bg-white text-gray-900";
  
  const tableHeaderClasses = isDarkMode 
    ? "bg-blue-600 text-white" 
    : "bg-blue-300 text-gray-900";
  
  const tableRowClasses = isDarkMode 
    ? "hover:bg-blue-700 bg-gray-700 text-white" 
    : "hover:bg-blue-400 bg-gray-200 text-gray-900";
  
  const buttonAddClasses = isDarkMode 
    ? "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" 
    : "bg-green-300 text-gray-900 px-4 py-2 rounded hover:bg-green-400";
  
  const buttonActionClasses = isDarkMode 
    ? "bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600" 
    : "bg-blue-300 px-4 py-2 text-gray-900 rounded-md hover:bg-blue-400";
  
  const titleClasses = isDarkMode 
    ? "text-2xl font-bold text-white" 
    : "text-2xl font-bold text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      <div className="flex-1 p-5 mx-auto w-4/5">
        <div className="flex justify-between items-center mb-5">
          <h1 className={titleClasses}>Retur Barang</h1>
          <button className={buttonAddClasses} onClick={() => navigate("/kepalagudang/addBarangRetur")}>
            + Barang
          </button>
        </div>

        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={tableHeaderClasses}>
              <th className="p-3 border">No</th>
              <th className="p-3 border">ID Barang</th>
              <th className="p-3 border">Nama Barang</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Tanggal</th>
              <th className="p-3 border">Foto Barang</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {returData.map((retur, index) => (
              <tr key={retur.idReturGudang} className={`${tableRowClasses} border`}>
                <td className="p-3 border">{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                <td className="p-3 border">{retur.id_barang}</td>
                <td className="p-3 border">{retur.namaBarang}</td>
                <td className="p-3 border">{retur.jumlahBarang}</td>
                <td className="p-3 border">{new Date(retur.tanggal).toLocaleDateString()}</td>
                <td className="p-3 border">
                  <div className="flex justify-center">
                    <img
                      src={`http://localhost:3000/api/admin/uploads/stock/${retur.photoBarang}`}
                      alt="Barang"
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                </td>
                <td className="p-3 border">{retur.status}</td>
                <td className="p-3 border">
                  {retur.status !== "approved" && (
                    <button
                      className={buttonActionClasses}
                      onClick={() => handleApprove(retur.idReturGudang)}
                    >
                      Retur Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturAdmin;