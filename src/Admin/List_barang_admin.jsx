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
    // Pastikan menggunakan endpoint yang benar
    axios.get("http://localhost:3000/api/admin/getProduct")
      .then((response) => {
        setProducts(response.data.data); // Data dari API disimpan di state products
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  // Memastikan namaBarang ada sebelum melakukan .toLowerCase()
  const filteredProducts = products.filter(product =>
    product.Nama_product && product.Nama_product.toLowerCase().includes(searchQuery.toLowerCase())
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
              className={`border border-gray-300 py-2 px-4 rounded ${isDarkMode ? "text-white" : "text-gray-900"}`}
            />
          </div>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.Id_product} className="border rounded-md p-4 shadow-lg">
                <img
                  src={`http://localhost:3000/uploads/product/${product.Photo_product}`}
                  alt={product.Nama_product}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{product.Nama_product}</h3>
                <p className="text-gray-500">Harga: Rp {product.Harga}</p>
                <p className="text-gray-500">Stock: {product.Stock_barang}</p>
                <p className="text-gray-500">Tanggal Masuk: {product.Tanggal_masuk}</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
                  onClick={() => navigate(`/admin/detailBarang/${product.Id_product}`)}
                >
                  Detail
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tidak ada barang yang ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List_barang_admin;
