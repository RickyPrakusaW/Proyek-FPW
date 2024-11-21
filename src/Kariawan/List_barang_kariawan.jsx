import React from "react";
import { useNavigate } from "react-router-dom";
function List_barang_kariawan() {
    const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-5 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-xl font-bold text-blue-600">Tiok</h2>
        {/* Menu */}
        <div className="mt-8 space-y-4 w-full">
          <button className="w-full text-left text-gray-600 hover:text-blue-600"  onClick={() => navigate("/Listbarangkariawan")}>
            List Barang
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600" onClick={() => navigate("/Keranjang")}>
            Keranjang
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600" onClick={() => navigate("/Retur")}>
            Cek Stok Gudang
          </button>
        </div>
        {/* Logout Button */}
        <button className="mt-auto px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600">
          Keluar
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-blue-50">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">List Barang</h1>

        {/* Product List */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-blue-300 rounded-lg mb-4"></div>
              {/* Product Name */}
              <h2 className="text-lg font-bold">Barang {index + 1}</h2>
              {/* Product Details */}
              <p className="text-gray-600">Rp. 0</p>
              <p className="text-gray-600">Stock: 0</p>
              {/* Button */}
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List_barang_kariawan;
