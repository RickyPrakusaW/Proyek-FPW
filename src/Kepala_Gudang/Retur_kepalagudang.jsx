import React from "react";
import { useNavigate } from "react-router-dom";

const ReturAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-xl font-bold">Retur Barang (Admin)</h1>
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
              className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
                
            >
              Stock Gudang
            </li>
            <li 
            onClick={() => navigate("/Tambahbarangmasuukkepalagudang")} 
            className="p-3 hover:bg-blue-600 rounded-md">Tambah Barang Masuk</li>
            <li 
            // onClick={() => navigate("/Returkepalagudang")} 
            className="p-3 hover:bg-blue-600 rounded-md">Barang Keluar</li>
            <li 
            onClick={() => navigate("/Returkepalagudang")} 
            className="bg-blue-600 p-3 rounded-md cursor-pointer">Retur Barang</li>
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
            <h1 className="text-2xl font-bold">Retur Barang</h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => navigate("/Addretur")}>
              + Barang
            </button>
          </div>

          {/* Tabel */}
          <table className="w-full text-center text-white border-collapse">
            <thead>
              <tr className="bg-blue-600">
                <th className="p-3 border">No</th>
                <th className="p-3 border">ID Barang</th>
                <th className="p-3 border">Nama Barang</th>
                <th className="p-3 border">Jumlah</th>
                <th className="p-3 border">Foto Barang</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} hover:bg-blue-700`}
                >
                  <td className="p-3 border">{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                  <td className="p-3 border">00{index + 1}</td>
                  <td className="p-3 border">Example</td>
                  <td className="p-3 border">0</td>
                  <td className="p-3 border">
                    <div className="flex justify-center">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="Barang"
                        className="w-10 h-10"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex justify-end">
            <button className="bg-green-500 px-4 py-2 text-white rounded-md"  >
              Retur Barang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturAdmin;
