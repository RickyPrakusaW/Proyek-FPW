import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./component/SideBar";
import { useTheme } from "../ThemeContext";
import axios from "axios"; // Pastikan axios diimpor

const ReturAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [barangReturs, setBarangReturs] = useState([]);
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

  // Ambil data dari backend saat komponen dimuat
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/getRetur") // Pastikan URL benar
      .then((response) => {
        // Mengakses data dari response.data.data
        setBarangReturs(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the return data!", error);
      });
  }, []);

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      {/* <SideBar /> */}
      {/* Konten Utama */}
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Retur Barang</h1>
          <input
            type="text"
            placeholder="Cari"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-2 rounded-md border ${
              isDarkMode ? "border-gray-500 text-black" : "border-gray-700"
            } focus:outline-none`}
          />
        </div>

        {/* Tabel */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={`${tableHeaderClasses}`}>
              <th className="p-3 border">No</th>
              <th className="p-3 border">ID Barang</th>
              <th className="p-3 border">Nama Barang</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Foto Barang</th>
            </tr>
          </thead>
          <tbody>
            {barangReturs.length > 0 ? (
              barangReturs
                .filter((barang) =>
                  barang.Nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((barang, index) => (
                  <tr key={barang._id} className={`${tableRowClasses}`}>
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{barang.Id_barang}</td>
                    <td className="p-3 border">{barang.Nama_barang}</td>
                    <td className="p-3 border">{barang.Jumlah_barang}</td>
                    <td className="p-3 border">
                      <div className="flex justify-center">
                        <img
                          src={
                            barang.Photo_product
                              ? `http://localhost:3000/uploads/${barang.Photo_product}`
                              : "https://via.placeholder.com/40"
                          }
                          alt={barang.Nama_barang}
                          className="w-10 h-10"
                        />
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  Tidak ada data retur barang.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturAdmin;
