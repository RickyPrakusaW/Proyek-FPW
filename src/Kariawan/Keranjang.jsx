import React from "react";
import { useNavigate } from "react-router-dom";
function Keranjang() {
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
      <main className="flex-1 p-6 bg-gray-50">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">Keranjang</h1>
          <table className="w-full mt-4 text-center border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">ID Barang</th>
                <th className="px-4 py-2 border">Nama Barang</th>
                <th className="px-4 py-2 border">Jumlah</th>
                <th className="px-4 py-2 border">Foto</th>
                <th className="px-4 py-2 border">Harga</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <tr key={index} className="bg-blue-100 hover:bg-blue-200">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">00{index + 1}</td>
                  <td className="px-4 py-2 border">Example</td>
                  <td className="px-4 py-2 border flex items-center justify-center space-x-2">
                    <button className="px-2 py-1 bg-red-500 text-white rounded">-</button>
                    <span>0</span>
                    <button className="px-2 py-1 bg-green-500 text-white rounded">+</button>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="w-12 h-12 bg-gray-200"></div>
                  </td>
                  <td className="px-4 py-2 border">Rp. 0</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Total Penjualan: Rp. 0</h2>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => navigate("/Checkout")} >Proses</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Keranjang;
