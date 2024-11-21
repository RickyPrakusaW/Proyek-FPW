import React from "react";
import { useNavigate } from "react-router-dom";
const ManageKaryawan = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-xl font-bold">Manage Karyawan (Admin)</h1>
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
              className="bg-blue-600 p-3 rounded-md cursor-pointer"
              onClick={() => navigate("/Managekariawan")}
            >
              Manage Karyawan
            </li>
            <li onClick={() => navigate("/Stockgudangadmin")} className="p-3 hover:bg-blue-600 rounded-md">Stock Gudang</li>
            <li onClick={() => navigate("/Returadmin")} className="p-3 hover:bg-blue-600 rounded-md">Retur Barang</li>
            <li className="p-3 hover:bg-blue-600 rounded-md">List Barang</li>
          </ul>
          <button
            className="mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold"
            onClick={() => navigate("/")}
          >
            Keluar
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5">
          {/* Header Content */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">Daftar Karyawan</h2>
            <div>
              <button className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold" onClick={() => navigate("/Tambahkariawan")}>
                + Tambah Karyawan
              </button>
              <span className="ml-5 text-lg">Total Karyawan: 3</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-gray-800 p-5 rounded-md">
            <table className="w-full text-center text-white border-collapse">
              <thead>
                <tr className="bg-blue-600">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "01", email: "example@gmail.com", status: "Bekerja" },
                  { id: "02", email: "example@gmail.com", status: "Dipecat" },
                  { id: "03", email: "example@gmail.com", status: "Bekerja" },
                  { id: "04", email: "example@gmail.com", status: "Dipecat" },
                  { id: "05", email: "example@gmail.com", status: "Bekerja" },
                  { id: "06", email: "example@gmail.com", status: "Dipecat" },
                ].map((karyawan, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                    }`}
                  >
                    <td className="p-3 border">{karyawan.id}</td>
                    <td className="p-3 border">{karyawan.email}</td>
                    <td className="p-3 border">{karyawan.status}</td>
                    <td className="p-3 border">
                      {karyawan.status === "Bekerja" ? (
                        <button className="bg-pink-500 px-3 py-1 rounded-md mr-2 text-white font-semibold">
                          Pecat
                        </button>
                      ) : (
                        <button className="bg-purple-500 px-3 py-1 rounded-md mr-2 text-white font-semibold">
                          Rekrut
                        </button>
                      )}
                      <button className="bg-green-500 px-3 py-1 rounded-md text-white font-semibold">
                        Ubah
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

export default ManageKaryawan;