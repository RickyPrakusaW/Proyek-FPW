import React from "react";

function AddRetur() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Retur Barang</h2>
        </div>
        <form className="space-y-4">
          {/* ID Barang */}
          <div>
            <label htmlFor="idBarang" className="block text-sm font-medium text-gray-700">
              ID Barang
            </label>
            <input
              type="text"
              id="idBarang"
              placeholder="ID Barang"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Nama Barang */}
          <div>
            <label htmlFor="namaBarang" className="block text-sm font-medium text-gray-700">
              Nama Barang
            </label>
            <input
              type="text"
              id="namaBarang"
              placeholder="Nama Barang"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Jumlah Barang */}
          <div>
            <label htmlFor="jumlahBarang" className="block text-sm font-medium text-gray-700">
              Jumlah Barang
            </label>
            <input
              type="number"
              id="jumlahBarang"
              placeholder="Jumlah Barang"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Foto Barang */}
          <div>
            <label htmlFor="fotoBarang" className="block text-sm font-medium text-gray-700">
              Foto Barang
            </label>
            <input
              type="file"
              id="fotoBarang"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRetur;
