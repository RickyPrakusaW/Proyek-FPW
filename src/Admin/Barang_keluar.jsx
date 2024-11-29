import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const Barang_keluar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-gray-900";
  const buttonClasses = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500"
    : "bg-blue-400 hover:bg-blue-300";

  const barangKeluarData = [
    {
      id: "BR001",
      name: "Tas pakian alto  ",
      qty: 3,
      type: "tas pakian",
      photo: "https://via.placeholder.com/100",
      date: "2024-11-28",
      takenBy: "Budi Santoso",
      status: "Belum Diterima",
    },
    {
        id: "BR001",
        name: "Tas pakian alto  ",
        qty: 3,
        type: "tas pakian",
        photo: "https://via.placeholder.com/100",
        date: "2024-11-28",
        takenBy: "Budi Santoso",
        status: "Belum Diterima",
      },
      {
        id: "BR001",
        name: "Tas pakian alto  ",
        qty: 3,
        type: "tas pakian",
        photo: "https://via.placeholder.com/100",
        date: "2024-11-28",
        takenBy: "Budi Santoso",
        status: "Belum Diterima",
      },
      {
        id: "BR001",
        name: "Tas pakian alto  ",
        qty: 3,
        type: "tas pakian",
        photo: "https://via.placeholder.com/100",
        date: "2024-11-28",
        takenBy: "Budi Santoso",
        status: "Belum Diterima",
      },
      {
        id: "BR001",
        name: "Tas pakian alto  ",
        qty: 3,
        type: "tas pakian",
        photo: "https://via.placeholder.com/100",
        date: "2024-11-28",
        takenBy: "Budi Santoso",
        status: "Belum Diterima",
      },
      {
        id: "BR001",
        name: "Tas pakian alto  ",
        qty: 3,
        type: "tas pakian",
        photo: "https://via.placeholder.com/100",
        date: "2024-11-28",
        takenBy: "Budi Santoso",
        status: "Belum Diterima",
      },{
        id: "BR001",
        name: "Tas pakian alto  ",
        qty: 3,
        type: "tas pakian",
        photo: "https://via.placeholder.com/100",
        date: "2024-11-28",
        takenBy: "Budi Santoso",
        status: "Belum Diterima",
      },
  ];

  const handleStatusUpdate = (id) => {
    const updatedData = barangKeluarData.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Sudah Diterima" ? "Belum Diterima" : "Sudah Diterima" }
        : item
    );
    console.log(updatedData); // Untuk debugging
    // Update state atau data di backend di sini jika diperlukan.
  };

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen ${sidebarClasses} p-5 transition-all duration-300`}
      >
        {/* Sidebar content here */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 space-y-5">
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${buttonClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Penjualan")}
          >
            <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000</p>
          </div>
          <div
            className={`${buttonClasses} p-5 rounded-md text-center`}
            onClick={() => navigate("/Barang_keluar")}
          >
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div className={`${buttonClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">0 Barang</p>
          </div>
        </div>

        {/* Barang Keluar Section */}
        <div className={`${sidebarClasses} p-5 rounded-md`}>
          <h3 className="text-xl font-semibold mb-3">Barang Keluar</h3>
          <div className="overflow-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3">ID Barang</th>
                  <th className="p-3">Foto</th>
                  <th className="p-3">Nama Barang</th>
                  <th className="p-3">Jumlah</th>
                  <th className="p-3">Tipe Barang</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Diambil Oleh</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {barangKeluarData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.qty}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.takenBy}</td>
                    <td className="p-3">{item.status}</td>
                    <td className="p-3">
                      <button
                        className={`px-3 py-1 rounded-md text-white ${
                          item.status === "Sudah Diterima"
                            ? "bg-green-500 hover:bg-green-400"
                            : "bg-red-500 hover:bg-red-400"
                        }`}
                        onClick={() => handleStatusUpdate(item.id)}
                      >
                        {item.status === "Sudah Diterima" ? "Batalkan" : "Terima"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barang_keluar;
