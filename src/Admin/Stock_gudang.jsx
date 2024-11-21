import React from "react";
import { useNavigate } from "react-router-dom";

const Stockgudang = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-xl font-bold">Lihat Stock (Admin)</h1>
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
              className="bg-blue-600 p-3 rounded-md cursor-pointer"
              onClick={() => navigate("/Stockgudangadmin")}
            >
              Stock Gudang
            </li>
            <li
             className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
             onClick={() => navigate("/Returadmin")}
            >
              Retur Barang
            </li>
            <li className="p-3 hover:bg-blue-600 rounded-md cursor-pointer" onClick={() => navigate("/List_barang_admin")}>
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
        <div className="flex-1 p-5 bg-gray-800 rounded-md">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold">Stock Di Gudang</h1>
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded-md border border-gray-700 text-black focus:outline-none"
            />
          </div>

          {/* Tabel */}
          <table className="w-full text-center text-white border-collapse">
            <thead>
              <tr className="bg-blue-600">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Nama</th>
                <th className="p-3 border">Jumlah</th>
                <th className="p-3 border">Tanggal Masuk</th>
                <th className="p-3 border">Tanggal Keluar</th>
                <th className="p-3 border">Tipe Barang</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} hover:bg-blue-700`}
                >
                  <td className="p-3 border">00{index + 1}</td>
                  <td className="p-3 border">Example</td>
                  <td className="p-3 border">0</td>
                  <td className="p-3 border">11 November 2024</td>
                  <td className="p-3 border">11 November 2024</td>
                  <td className="p-3 border">
                    {index % 3 === 0
                      ? "Tas Sekolah"
                      : index % 3 === 1
                      ? "Tas Anak"
                      : "Tas Canvas"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stockgudang;
