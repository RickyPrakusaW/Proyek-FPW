import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import SideBar from "./component/SideBar";

const ManageKaryawan = () => {
  const navigate = useNavigate();
  const [karyawans, setKaryawans] = useState([]);
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const tableClasses = isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900";
  const isLightMode = !isDarkMode;

  useEffect(() => {
    // Mengambil data karyawan dari backend
    axios.get("http://localhost:3000/api/admin/getKaryawan")
      .then((response) => {
        setKaryawans(response.data.data); // Menyimpan data karyawan dalam state
      })
      .catch((error) => {
        console.error("There was an error fetching the karyawan data!", error);
      });
  }, []);

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      {/* <SideBar /> */}
      <div className="flex-1 p-8">
        {/* Header Content */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Daftar Karyawan</h2>
          <div>
            <button
              className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold"
              onClick={() => navigate("/admin/addKaryawan")}
            >
              + Tambah Karyawan
            </button>
            <span className="ml-5 text-lg">Total Karyawan: {karyawans.length}</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className={`text-white ${isLightMode ? "bg-blue-400" : "bg-blue-600"}`}>
                <th className="p-4 border">ID</th>
                <th className="p-4 border">Nama Lengkap</th>
                <th className="p-4 border">Tempat Lahir</th>
                <th className="p-4 border">Tanggal Lahir</th>
                <th className="p-4 border">Jenis Kelamin</th>
                <th className="p-4 border">Golongan Darah</th>
                <th className="p-4 border">No Telepon</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {karyawans.length > 0 ? (
                karyawans.map((karyawan, index) => (
                  <tr
                    key={karyawan.id_karyawan}
                    className={`${isLightMode ? (index % 2 === 0 ? "bg-gray-50" : "bg-gray-100") : (index % 2 === 0 ? "bg-gray-700" : "bg-gray-600")}`}
                  >
                    <td className="p-3 border">{karyawan.id_karyawan}</td>
                    <td className="p-3 border">{karyawan.nama_lengkap}</td>
                    <td className="p-3 border">{karyawan.tempat_lahir}</td>
                    <td className="p-3 border">{karyawan.tanggal_lahir}</td>
                    <td className="p-3 border">{karyawan.jenis_kelamin}</td>
                    <td className="p-3 border">{karyawan.golongan_darah}</td>
                    <td className="p-3 border">{karyawan.no_telepon}</td>
                    <td className="p-3 border">{karyawan.status}</td>
                    <td className="p-3 border">
                      <button className="bg-blue-500 px-3 py-1 rounded-md mr-2 text-white font-semibold">
                        Detail
                      </button>
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
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-3 text-center text-gray-500">
                    Tidak ada karyawan yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageKaryawan;
