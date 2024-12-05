import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./component/SideBar"; 
import { useTheme } from "../ThemeContext"; 

const StockGudang = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); 
  const [searchQuery, setSearchQuery] = useState("");

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const tableHeaderClasses = isDarkMode
    ? "bg-blue-600 text-white"
    : "bg-blue-300 text-gray-900";
  const tableRowClasses = isDarkMode
    ? "bg-gray-700 hover:bg-blue-700"
    : "bg-gray-100 hover:bg-blue-100";

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Stock Di Gudang</h1>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-2 rounded-md border ${
              isDarkMode ? "border-gray-500 text-black" : "border-gray-700"
            } focus:outline-none`}
          />
        </div>

        {/* Table Section */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={`${tableHeaderClasses}`}>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Tanggal Masuk</th>
              <th className="p-3 border">Tanggal Keluar</th>
              <th className="p-3 border">Tipe Barang</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, index) => (
              <tr key={index} className={`${tableRowClasses}`}>
                <td className="p-3 border">00{index + 1}</td>
                <td className="p-3 border">Example</td>
                <td className="p-3 border">0</td>
                <td className="p-3 border">11 November 2024</td>
                <td className="p-3 border">11 November 2024</td>
                <td className="p-3 border">
                  {index % 3 === 0
                    ? "Tas Sekolah"
                    : index % 3 === 1
                    ? "Tas Anak"
                    : "Tas Canvas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockGudang;
