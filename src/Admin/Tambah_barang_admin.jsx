import React from "react";
import { useNavigate } from "react-router-dom";
function TambahBarangPopup({ onClose }) {
    const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Popup Container */}
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-5">
        {/* Header */}
        <div className="border-b pb-3 mb-5">
          <h2 className="text-xl font-bold text-gray-800">Tambah Barang</h2>
        </div>

        {/* Form */}
        <form>
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
            {/* Harga Barang */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Harga Barang</label>
              <input
                type="text"
                placeholder="Harga Barang"
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
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/List_barang_admin")}
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
  );
}

export default TambahBarangPopup;
