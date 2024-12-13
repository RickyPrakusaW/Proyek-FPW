import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function List_barang_kariawan() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
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
        const response = await fetch("http://localhost:3000/api/admin/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data || []);
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
      const response = await fetch("http://localhost:3000/api/admin/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idBarang: product._id,
          Id_product: product._id, // Tambahkan properti ini
          namaBarang: product.Nama_product,
          totalProduct: 1, // Jumlah awal
          harga: product.Harga,
          photo: product.Photo_product || "", // Pastikan property sesuai
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product to cart");
      }
  
      const data = await response.json();
      alert(data.message || "Product successfully added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      alert("An error occurred while adding product to the cart");
    }
  };
  

  return (
    <div className={`flex flex-col h-screen ${themeClasses}`}>
      <div className={`w-full p-6 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <h1 className="text-2xl font-bold text-blue-600 mb-6">List Barang</h1>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className={`rounded-lg shadow-lg p-4 flex flex-col items-center ${cardClasses}`}
              >
                {product.Photo_product ? (
                   <img
                   src={`http://localhost:3000/uploads/product/${product.Photo_product}`}
                   alt={product.Nama_product}
                   className="w-full h-64 object-cover mb-4"
                 />
                ) : (
                  <div className="w-full h-40 bg-gray-300 rounded-lg mb-4"></div>
                )}
                <h2 className="text-lg font-semibold text-center">{product.Nama_product}</h2>
                <p className="text-center">Rp. {product.Harga}</p>
                <p className="text-center">Stock: {product.Stock_barang}</p>
                <button
                  onClick={() => addToCart(product)}
                  className={`mt-4 px-6 py-2 text-white rounded-lg shadow ${buttonClasses}`}
                >
                  Add to Cart
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
