import React from "react";
import { useNavigate } from "react-router-dom";

function List_barang_admin() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-5">
          <div className="flex items-center space-x-3 mb-10">
            <img
              src="https://via.placeholder.com/50"
              alt="Admin Avatar"
              className="rounded-full w-12 h-12"
            />
            <h2 className="text-xl font-semibold">Admin</h2>
          </div>
          <ul className="space-y-4">
            <li
              className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
              onClick={() => navigate("/Homeadmin")}
            >
              Dashboard
            </li>
            <li
              className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
              onClick={() => navigate("/Managekariawan")}
            >
              Manage Karyawan
            </li>
            <li
              className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
              onClick={() => navigate("/Stockgudangadmin")}
            >
              Stock Gudang
            </li>
            <li className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
             onClick={() => navigate("/Returadmin")}
             >
           
              Retur Barang
            </li>
            <li
              className="bg-blue-600 p-3 rounded-md cursor-pointer"
              onClick={() => navigate("/List_barang_admin")}
            >
              List Barang
            </li>
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
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">List Barang</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" 
            onClick={() => navigate("/Tambah_barang_admin")}
            >
              + Tambah Barang
            </button>
            <input
              type="text"
              placeholder="Cari"
              className="border border-gray-300 py-2 px-4 rounded"
            />
          </div>
        </div>

        {/* Total Barang */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Total Barang: 8</p>
        </div>

        {/* Barang List */}
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-blue-200 text-center p-4 rounded shadow flex flex-col justify-between"
            >
              {/* Barang Icon */}
              <div className="w-full h-20 flex items-center justify-center bg-blue-300 rounded mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v3.75"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10.5L12 16.5l9-6M3 10.5v6.75a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 17.25v-6.75"
                  />
                </svg>
              </div>
              {/* Barang Info */}
              <p className="font-bold">Barang {index + 1}</p>
              <p>Stock: 0</p>
              <div className="flex justify-center space-x-2 mt-4">
                <button className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600">
                  Ubah
                </button>
                <button className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List_barang_admin;
