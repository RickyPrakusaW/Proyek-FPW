import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TambahKaryawan = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen bg-gray-800 p-5 transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/50"
                alt="Admin Avatar"
                className="rounded-full w-12 h-12"
              />
              <h2 className="text-xl font-semibold">Admin</h2>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="mt-10 space-y-4">
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              isSidebarOpen ? "bg-blue-600" : ""
            }`}
            onClick={() => navigate("/Homeadmin")}
          >
            <span>🏠</span>
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
              isSidebarOpen ? "bg-blue-600" : ""
            }`}
            onClick={() => navigate("/Managekariawan")}
          >
            <span>👥</span>
            {isSidebarOpen && <span>Manage Karyawan</span>}
          </li>
          <li
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/Stockgudangadmin")}
          >
            <span>📦</span>
            {isSidebarOpen && <span>Stock Gudang</span>}
          </li>
          <li
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/Returadmin")}
          >
            <span>↩️</span>
            {isSidebarOpen && <span>Retur Barang</span>}
          </li>
          <li
            className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={() => navigate("/List_barang_admin")}
          >
            <span>📋</span>
            {isSidebarOpen && <span>List Barang</span>}
          </li>
        </ul>

        {/* Logout Button */}
        <button
          className="mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold hover:bg-pink-400"
          onClick={() => navigate("/")}
        >
          {isSidebarOpen ? "Keluar" : "🚪"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 text-gray-800">
        <h2 className="text-2xl font-bold mb-5">Tambah Karyawan</h2>
        <form className="bg-white p-8 rounded-md shadow-md space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <label className="block font-semibold mb-1">ID Karyawan</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan ID Karyawan"
              />

              <label className="block font-semibold mb-1 mt-4">Nama Lengkap</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan Nama Lengkap"
              />

              <label className="block font-semibold mb-1 mt-4">Tempat Lahir</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan Tempat Lahir"
              />

              <label className="block font-semibold mb-1 mt-4">Tanggal Lahir</label>
              <input type="date" className="w-full p-2 border rounded-md" />

              <label className="block font-semibold mb-1 mt-4">Jenis Kelamin</label>
              <div className="flex items-center space-x-4">
                <label>
                  <input type="radio" name="gender" className="mr-2" />
                  Pria
                </label>
                <label>
                  <input type="radio" name="gender" className="mr-2" />
                  Perempuan
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block font-semibold mb-1">Golongan Darah</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan Golongan Darah"
              />

              <label className="block font-semibold mb-1 mt-4">Alamat</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan Alamat"
              />

              <label className="block font-semibold mb-1 mt-4">No Telephone</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan No Telepon"
              />

              <label className="block font-semibold mb-1 mt-4">Agama</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Masukkan Agama"
              />

              <label className="block font-semibold mb-1 mt-4">KTP</label>
              <input type="file" className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-pink-500 px-5 py-2 rounded-md text-white font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahKaryawan;
