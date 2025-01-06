import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";

const List_barang_admin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product for the popup
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const tableRowClasses = isDarkMode ? "bg-gray-700 hover:bg-blue-700" : "bg-gray-100 hover:bg-blue-100";

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/products")
      .then((response) => {
        setProducts(response.data.data); // Assume API returns { data: [...] }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.Nama_product && product.Nama_product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDetail = (product) => {
    setSelectedProduct(product); // Set the selected product for the popup
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className={`text-2xl font-bold ${textColor}`}>List Barang</h1>
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded text-white"
              onClick={() => navigate("/admin/tambahBarang")}
            >
              + Tambah Barang
            </button>
            <input
              type="text"
              placeholder="Cari"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`border py-2 px-4 rounded ${textColor}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.Id_product} className="border rounded-md p-4 shadow-lg">
                <img
                  src={`http://localhost:3000/uploads/product/${product.Photo_product}`}
                  alt={product.Nama_product}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className={`text-xl font-semibold ${textColor}`}>{product.Nama_product}</h3>
                <p className={`${textColor}`}>Harga: Rp {product.Harga}</p>
                <p className={`${textColor}`}>Stock: {product.Stock_barang}</p>
                <p className={`${textColor}`}>Tanggal Masuk: {product.Tanggal_masuk}</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
                  onClick={() => handleDetail(product)}
                >
                  Detail
                </button>
              </div>
            ))
          ) : (
            <p className={`text-center ${textColor}`}>Tidak ada barang yang ditemukan.</p>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`bg-white rounded-lg p-6 w-3/4 md:w-1/2 shadow-lg relative ${themeClasses}`}>
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className={`text-2xl font-semibold mb-4 ${`text-black`}`}>{selectedProduct.Nama_product}</h2>
            <img
              src={`http://localhost:3000/uploads/product/${selectedProduct.Photo_product}`}
              alt={selectedProduct.Nama_product}
              className="w-full h-64 object-cover mb-4"
            />
            <p className={`text-black`}>Harga: Rp {selectedProduct.Harga}</p>
            <p className={`text-black`}>Stock: {selectedProduct.Stock_barang}</p>
            <p className={`text-black`}>Tanggal Masuk: {selectedProduct.Tanggal_masuk}</p>

            {/* Back Button */}
            <button
              onClick={handleClosePopup}
              className="bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded text-white mt-4 w-full"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List_barang_admin;
