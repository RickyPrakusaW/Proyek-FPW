import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./component/SideBar"; 
import { useTheme } from "../ThemeContext"; 
import axios from "axios"; // Pastikan axios diimpor

const List_barang_admin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    axios.get("http://localhost:3000/admin/fetchProduct")
      .then((response) => {
        setProducts(response.data); // Data dari API disimpan di state products
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.namaBarang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">List Barang</h1>
          <div className="flex items-center space-x-4">
            <button
              className={`bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded`}
              onClick={() => navigate("/admin/tambahBarang")}
            >
              + Tambah Barang
            </button>
            <input
              type="text"
              placeholder="Cari"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`border border-gray-300 py-2 px-4 rounded ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            />
          </div>
        </div>

        {/* Table Section */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={`${tableHeaderClasses}`}>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Tanggal Masuk</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.idBarang} className={`${tableRowClasses}`}>
                  <td className="p-3 border">{product.idBarang}</td>
                  <td className="p-3 border">{product.namaBarang}</td>
                  <td className="p-3 border">{product.stock}</td>
                  <td className="p-3 border">{product.tanggalMasuk}</td>
                  <td className="p-3 border">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                        onClick={() => navigate(`/Ubah_barang/${product.idBarang}`)}
                      >
                        Ubah
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                        onClick={() => console.log(`Hapus Barang ${product.idBarang}`)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  Tidak ada data barang yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List_barang_admin;
