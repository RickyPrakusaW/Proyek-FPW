import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTheme } from "../ThemeContext";
import SideBar from "./component/SideBar";

const TambahKaryawan = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-300";

  const handleAddKaryawan = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/admin/addKaryawan", data);
      navigate("/admin");
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        console.error("Error saat menambahkan karyawan:", error);
        alert("Terjadi kesalahan pada server.");
      }
    }
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <SideBar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-5">Tambah Karyawan</h2>
        <form
          className={`p-8 rounded-md shadow-md space-y-4 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          onSubmit={handleSubmit(handleAddKaryawan)}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <label className="block font-semibold mb-1">ID Karyawan</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan ID Karyawan"
                {...register("id_karyawan")}
              />

              <label className="block font-semibold mb-1 mt-4">Nama Lengkap</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Nama Lengkap"
                {...register("nama_lengkap")}
              />

              <label className="block font-semibold mb-1 mt-4">Tempat Lahir</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Tempat Lahir"
                {...register("tempat_lahir")}
              />

              <label className="block font-semibold mb-1 mt-4">Tanggal Lahir</label>
              <input
                type="date"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                {...register("tanggal_lahir")}
              />

              <label className="block font-semibold mb-1 mt-4">Jenis Kelamin</label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    className="mr-2"
                    {...register("jenis_kelamin")}
                  />
                  Pria
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    className="mr-2"
                    {...register("jenis_kelamin")}
                  />
                  Perempuan
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block font-semibold mb-1">Golongan Darah</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Golongan Darah"
                {...register("golongan_darah")}
              />

              <label className="block font-semibold mb-1 mt-4">Alamat</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Alamat"
                {...register("alamat")}
              />

              <label className="block font-semibold mb-1 mt-4">No Telephone</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan No Telepon"
                {...register("no_telepon")}
              />

              <label className="block font-semibold mb-1 mt-4">Agama</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Agama"
                {...register("agama")}
              />

              <label className="block font-semibold mb-1 mt-4">KTP</label>
              <input
                type="file"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                {...register("ktp")}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-pink-500 px-5 py-2 rounded-md text-white font-semibold"
              onClick={() => navigate("/admin")}
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
