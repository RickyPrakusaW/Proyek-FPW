import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Assuming ThemeContext is set up

const ManageKaryawan = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Akses tema dari context

  const isLightMode = theme === "light";

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLightMode ? "bg-gray-100 text-gray-800" : "bg-gray-900 text-white"
      }`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-5 ${
          isLightMode ? "bg-gray-200" : "bg-gray-800"
        }`}
      >
        <h1 className="text-xl font-bold">Manage Karyawan (Admin)</h1>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`w-1/4 p-5 ${
            isLightMode ? "bg-gray-200" : "bg-gray-800"
          }`}
        >
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
              className={`p-3 rounded-md cursor-pointer ${
                isLightMode ? "bg-blue-400 text-white" : "bg-blue-600"
              }`}
              onClick={() => navigate("/Managekariawan")}
            >
              Manage Karyawan
            </li>
            <li
              onClick={() => navigate("/Stockgudangadmin")}
              className="p-3 hover:bg-blue-600 rounded-md"
            >
              Stock Gudang
            </li>
            <li
              onClick={() => navigate("/Returadmin")}
              className="p-3 hover:bg-blue-600 rounded-md"
            >
              Retur Barang
            </li>
            <li
              onClick={() => navigate("/List_barang_admin")}
              className="p-3 hover:bg-blue-600 rounded-md"
            >
              List Barang
            </li>
          </ul>
          <button
            className={`mt-10 p-3 rounded-md w-full font-semibold ${
              isLightMode ? "bg-pink-400 text-white" : "bg-pink-500"
            }`}
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
              <button
                className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold"
                onClick={() => navigate("/Tambahkariawan")}
              >
                + Tambah Karyawan
              </button>
              <span className="ml-5 text-lg">Total Karyawan: 3</span>
            </div>
          </div>

          {/* Table */}
          <div
            className={`p-5 rounded-md ${
              isLightMode ? "bg-gray-200" : "bg-gray-800"
            }`}
          >
            <table className="w-full text-center border-collapse">
              <thead>
                <tr
                  className={`${
                    isLightMode ? "bg-blue-400" : "bg-blue-600"
                  } text-white`}
                >
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
                ].map((karyawan, index) => (
                  <tr
                    key={index}
                    className={`${
                      isLightMode
                        ? index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-gray-50"
                        : index % 2 === 0
                        ? "bg-gray-700"
                        : "bg-gray-600"
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
