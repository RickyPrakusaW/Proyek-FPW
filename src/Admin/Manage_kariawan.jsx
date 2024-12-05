import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { useForm } from "react-hook-form";
import SideBar from "./component/SideBar";
import axios from "axios";

const ManageKaryawan = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [karyawans, setKaryawans] = useState([]); // Perbaiki penggunaan useState
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-300";
  const isLightMode = !isDarkMode;

  useEffect(() => {
    axios.get("http://localhost:3000/admin/fetchKaryawan")
      .then((response) => {
        setKaryawans(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the karyawan data!", error);
      });
  }, []);

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 p-5">
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
            <span className="ml-5 text-lg">Total Karyawan: {karyawans.length}</span> {/* Menampilkan total karyawan */}
          </div>
        </div>

        {/* Table */}
        <div
          className={`p-5 rounded-md ${isLightMode ? "bg-gray-200" : "bg-gray-800"}`}
        >
          <table className="w-full text-center border-collapse">
            <thead>
              <tr
                className={`${isLightMode ? "bg-blue-400" : "bg-blue-600"} text-white`}
              >
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {karyawans.length > 0 ? (
                karyawans.map((karyawan, index) => (
                  <tr
                    key={karyawan.id}
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
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
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