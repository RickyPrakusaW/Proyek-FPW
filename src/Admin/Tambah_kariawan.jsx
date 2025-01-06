import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useTheme } from "../ThemeContext";
import SideBar from "./component/SideBar";

const TambahKaryawan = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-300";

  const handleAddKaryawan = async (data) => {
    try {
      // Siapkan formData untuk mengirim file dan data lainnya
      const formData = new FormData();
      formData.append("nama_lengkap", data.nama_lengkap);
      formData.append("email", data.email); // Tambahkan email
      formData.append("tempat_lahir", data.tempat_lahir);
      formData.append("tanggal_lahir", data.tanggal_lahir);
      formData.append("jenis_kelamin", data.jenis_kelamin);
      formData.append("golongan_darah", data.golongan_darah);
      formData.append("alamat", data.alamat);
      formData.append("no_telepon", data.no_telepon);
      formData.append("agama", data.agama);
      formData.append("foto_ktp", data.ktp[0]);
      formData.append("password", data.password);

      // Kirim data ke backend menggunakan axios
      const response = await axios.post(
        "http://localhost:3000/api/admin/addKaryawan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Karyawan berhasil ditambahkan!");
      navigate("/admin"); // Navigasi kembali ke halaman admin setelah berhasil
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
      {/* <SideBar /> */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-5">Tambah Karyawan</h2>
        <form
          className={`p-8 rounded-md shadow-md space-y-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
          onSubmit={handleSubmit(handleAddKaryawan)}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Kolom Kiri */}
            <div>
              <label className="block font-semibold mb-1">Nama Lengkap</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Nama Lengkap"
                {...register("nama_lengkap", {
                  required: "Nama Lengkap wajib diisi",
                })}
              />
              {errors.nama_lengkap && (
                <span className="text-red-500">
                  {errors.nama_lengkap.message}
                </span>
              )}

              <label className="block font-semibold mb-1 mt-4">Email</label>
              <input
                type="email"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Email"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <label className="block font-semibold mb-1 mt-4">
                Tempat Lahir
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Tempat Lahir"
                {...register("tempat_lahir", {
                  required: "Tempat Lahir wajib diisi",
                })}
              />
              {errors.tempat_lahir && (
                <span className="text-red-500">
                  {errors.tempat_lahir.message}
                </span>
              )}

              <label className="block font-semibold mb-1 mt-4">
                Tanggal Lahir
              </label>
              <input
                type="date"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                {...register("tanggal_lahir", {
                  required: "Tanggal Lahir wajib diisi",
                })}
              />
              {errors.tanggal_lahir && (
                <span className="text-red-500">
                  {errors.tanggal_lahir.message}
                </span>
              )}

              <label className="block font-semibold mb-1 mt-4">
                Jenis Kelamin
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    value="Pria"
                    {...register("jenis_kelamin", {
                      required: "Jenis Kelamin wajib diisi",
                    })}
                  />
                  Pria
                </label>
                <label>
                  <input
                    type="radio"
                    value="Perempuan"
                    {...register("jenis_kelamin", {
                      required: "Jenis Kelamin wajib diisi",
                    })}
                  />
                  Perempuan
                </label>
              </div>
              {errors.jenis_kelamin && (
                <span className="text-red-500">
                  {errors.jenis_kelamin.message}
                </span>
              )}
            </div>

            {/* Kolom Kanan */}
            <div>
              <label className="block font-semibold mb-1">Golongan Darah</label>
              <select
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                {...register("golongan_darah", {
                  required: "Golongan Darah wajib diisi",
                })}
              >
                <option value="">Pilih Golongan Darah</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>

              {errors.golongan_darah && (
                <span className="text-red-500">
                  {errors.golongan_darah.message}
                </span>
              )}

              <label className="block font-semibold mb-1 mt-4">Alamat</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Alamat"
                {...register("alamat", { required: "Alamat wajib diisi" })}
              />
              {errors.alamat && (
                <span className="text-red-500">{errors.alamat.message}</span>
              )}

              <label className="block font-semibold mb-1 mt-4">
                No Telepon
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan No Telepon"
                {...register("no_telepon", {
                  required: "No Telepon wajib diisi",
                })}
              />
              {errors.no_telepon && (
                <span className="text-red-500">
                  {errors.no_telepon.message}
                </span>
              )}

              <label className="block font-semibold mb-1 mt-4">Agama</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Agama"
                {...register("agama", { required: "Agama wajib diisi" })}
              />
              {errors.agama && (
                <span className="text-red-500">{errors.agama.message}</span>
              )}

              <label className="block font-semibold mb-1 mt-4">
                Upload KTP
              </label>
              <input
                type="file"
                name="foto_ktp"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                accept=".jpg,.jpeg,.png"
                {...register("ktp", { required: "KTP wajib diupload" })}
              />
              {errors.ktp && (
                <span className="text-red-500">{errors.ktp.message}</span>
              )}

              <label className="block font-semibold mb-1 mt-4">Password</label>
              <input
                type="password"
                className={`w-full p-2 border rounded-md ${inputClasses}`}
                placeholder="Masukkan Password"
                {...register("password", { required: "Password wajib diisi" })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-5">
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
