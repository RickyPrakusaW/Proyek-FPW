import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

function List_barang_kariawan() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-green-600 hover:bg-green-700"
    : "bg-green-500 hover:bg-green-600";

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getProduct");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/updateCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idBarang: product._id,
          namaBarang: product.Nama_product,
          totalProduct: 1, // Jumlah awal produk
          harga: product.Harga,
          photo: product.photo || "", // Optional jika ada gambar
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan barang ke keranjang");
      }

      const data = await response.json();
      alert(data.message || "Barang berhasil ditambahkan ke keranjang");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menambahkan barang ke keranjang");
    }
  };

  return (
    <div className={`flex h-screen ${themeClasses}`}>
      <div className={`w-3/4 p-6 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <h1 className="text-2xl font-bold text-blue-600 mb-6">List Barang</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={product._id || index}
                className={`rounded-lg shadow p-4 flex flex-col items-center ${cardClasses}`}
              >
                {/* Product Image */}
                <div className="w-16 h-16 bg-blue-300 rounded-lg mb-4"></div>
                {/* Product Name */}
                <h2 className="text-lg font-bold">{product.Nama_product}</h2>
                {/* Product Details */}
                <p>Rp. {product.Harga}</p>
                <p>Stock: {product.Stock_barang}</p>
                {/* Button */}
                <button
                  onClick={() => addToCart(product)}
                  className={`mt-4 px-4 py-2 text-white rounded-lg shadow ${buttonClasses}`}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default List_barang_kariawan;
