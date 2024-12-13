import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

function Keranjang() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const tableHeaderClasses = isDarkMode
    ? "bg-gray-700 text-white"
    : "bg-blue-500 text-white";
  const tableRowClasses = isDarkMode
    ? "bg-gray-800 hover:bg-gray-700"
    : "bg-blue-100 hover:bg-blue-200";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getCart");
        if (!response.ok) {
          throw new Error("Gagal mengambil data keranjang");
        }
        const data = await response.json();
        setCartItems(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateCartItem = async (id, newQuantity) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/updateCart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, totalProduct: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui jumlah barang");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, totalProduct: newQuantity, totalBelanja: newQuantity * item.harga } : item
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/deleteCart/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus barang dari keranjang");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const totalPenjualan = cartItems.reduce(
    (total, item) => total + item.totalBelanja,
    0
  );

  return (
    <div className={`flex h-screen ${themeClasses}`}>
      {/* Main Content */}
      <main className={`flex-1 p-6 ${themeClasses}`}>
        <div className={`p-4 shadow-md rounded-lg ${cardClasses}`}>
          <h1 className="text-2xl font-bold">Keranjang</h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && cartItems.length === 0 && (
            <p className="text-gray-500 mt-4">Keranjang kosong</p>
          )}

          {!loading && !error && cartItems.length > 0 && (
            <>
              <table className="w-full mt-4 text-center border-collapse">
                <thead className={tableHeaderClasses}>
                  <tr>
                    <th className="px-4 py-2 border">No</th>
                    <th className="px-4 py-2 border">ID Barang</th>
                    <th className="px-4 py-2 border">Nama Barang</th>
                    <th className="px-4 py-2 border">Jumlah</th>
                    <th className="px-4 py-2 border">Foto</th>
                    <th className="px-4 py-2 border">Harga</th>
                    <th className="px-4 py-2 border">Total</th>
                    <th className="px-4 py-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item._id} className={tableRowClasses}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{item.Id_product}</td>
                      <td className="px-4 py-2 border">{item.namaBarang}</td>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded"
                            onClick={() =>
                              updateCartItem(item._id, Math.max(item.totalProduct - 1, 1))
                            }
                          >
                            -
                          </button>
                          <span>{item.totalProduct}</span>
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded"
                            onClick={() =>
                              updateCartItem(item._id, item.totalProduct + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 border">
                        {item.photo ? (
                          <img
                            src={item.photo}
                            alt={item.namaBarang}
                            className="w-12 h-12 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300"></div>
                        )}
                      </td>
                      <td className="px-4 py-2 border">Rp. {item.harga}</td>
                      <td className="px-4 py-2 border">Rp. {item.totalBelanja}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="px-2 py-1 bg-red-600 text-white rounded"
                          onClick={() => deleteCartItem(item._id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">
                  Total Penjualan: Rp. {totalPenjualan}
                </h2>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => navigate("/karyawan/checkOut")}
                >
                  Proses
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Keranjang;
