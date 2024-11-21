import React from "react";
import { useNavigate } from "react-router-dom";

const Tambah_barangmasuk_kepalagudang = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-xl font-bold">Lihat Stock (Kepala_Gudang)</h1>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-5">
          <div className="flex items-center space-x-3 mb-10">
            <img
              src="https://via.placeholder.com/50"
              alt="Admin Avatar"
              className="rounded-full w-12 h-12"
            />
            <h2 className="text-xl font-semibold">Kepala Gudang</h2>
          </div>
          <ul className="space-y-4">
            <li
              className="p-3 hover:bg-blue-600 rounded-md"
              onClick={() => navigate("/Homekepalagudang")}
            >
              Dashboard
            </li>
            <li
            onClick={() => navigate("/Stockgudangkepalagudang")}
              className="p-3 hover:bg-blue-600 rounded-md"
                
            >
              Stock Gudang
            </li>
            <li 
            onClick={() => navigate("/Tambahbarangmasuukkepalagudang")} 
            className="bg-blue-600 p-3 rounded-md cursor-pointer">Tambah Barang Masuk</li>
            <li 
            // onClick={() => navigate("/Returkepalagudang")} 
            className="p-3 hover:bg-blue-600 rounded-md">Barang Keluar</li>
            <li 
            onClick={() => navigate("/Returkepalagudang")} 
            className="p-3 hover:bg-blue-600 rounded-md">Retur Barang</li>
          </ul>
          <button
            className="mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold"
            onClick={() => navigate("/")}
          >
            Keluar
          </button>
        </div>

        {/* Main Content */}
         <div className="w-4/5 p-5">
        {/* Form Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tambah Barang Masuk</h1>
        </div>

        {/* Form */}
        <form className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-4">
            {/* ID Barang */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">ID Barang</label>
              <input
                type="text"
                placeholder="ID Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Nama Barang */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nama Barang</label>
              <input
                type="text"
                placeholder="Nama Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Jumlah Barang */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Jumlah Barang</label>
              <input
                type="number"
                placeholder="Jumlah Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Tipe Barang */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tipe Barang</label>
              <input
                type="text"
                placeholder="Tipe Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Tanggal Masuk */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tanggal Masuk</label>
              <input
                type="date"
                placeholder="Tanggal Masuk"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Foto Barang */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Foto Barang</label>
              <div className="flex items-center">
                <input
                  type="file"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-4 text-gray-500">Tidak Ada File yang Dipilih</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div> 
      </div>
    </div>
  );
};

export default Tambah_barangmasuk_kepalagudang;


