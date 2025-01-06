import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function TambahBarangPopup({ onClose }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleAddBarang = async (data) => {
    try {
      // Siapkan FormData untuk mengirim data
      const formData = new FormData();
      formData.append("Id_product", data.id_product);
      formData.append("Nama_product", data.nama_product);
      formData.append("Harga", data.harga);
      formData.append("Stock_barang", data.stock_barang);
      formData.append("Tipe", data.tipe);
      formData.append("Tanggal_masuk", data.tanggal_masuk);
      
      // Periksa apakah ada file yang diunggah
      if (data.photo_product && data.photo_product[0]) {
        formData.append("photo_product", data.photo_product[0]); // Memastikan nama field sesuai dengan yang di backend
      } else {
        alert("Foto produk wajib diunggah!");
        return;
      }

      // Kirim data ke backend menggunakan axios
      const response = await axios.post("http://localhost:3000/api/admin/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Tanggapan jika berhasil
      alert("Produk berhasil ditambahkan!");
      navigate("/admin/listBarang"); // Navigasi kembali ke halaman list barang
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        alert("Terjadi kesalahan saat mengirimkan data ke server.");
      } else {
        console.error("Error:", error.message);
        alert("Terjadi kesalahan pada server.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/2 rounded-lg shadow-lg p-5 text-black">
        <div className="border-b pb-3 mb-5">
          <h2 className="text-xl font-bold">Tambah Barang</h2>
        </div>

        <form onSubmit={handleSubmit(handleAddBarang)}>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">ID Barang</label>
              <input
                type="text"
                placeholder="ID Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("id_product", { required: "ID Barang harus diisi" })}
              />
              {errors.id_product && (
                <p className="text-red-500 text-sm">{errors.id_product.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Nama Barang</label>
              <input
                type="text"
                placeholder="Nama Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("nama_product", { required: "Nama Barang harus diisi" })}
              />
              {errors.nama_product && (
                <p className="text-red-500 text-sm">{errors.nama_product.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Jumlah Barang</label>
              <input
                type="number"
                placeholder="Jumlah Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("stock_barang", { required: "Jumlah Barang harus diisi" })}
              />
              {errors.stock_barang && (
                <p className="text-red-500 text-sm">{errors.stock_barang.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Harga Barang</label>
              <input
                type="number"
                placeholder="Harga Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("harga", { required: "Harga Barang harus diisi" })}
              />
              {errors.harga && (
                <p className="text-red-500 text-sm">{errors.harga.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Tipe Barang</label>
              <input
                type="text"
                placeholder="Tipe Barang"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("tipe", { required: "Tipe Barang harus diisi" })}
              />
              {errors.tipe && (
                <p className="text-red-500 text-sm">{errors.tipe.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Tanggal Masuk</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("tanggal_masuk", { required: "Tanggal Masuk harus diisi" })}
              />
              {errors.tanggal_masuk && (
                <p className="text-red-500 text-sm">{errors.tanggal_masuk.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Foto Barang</label>
              <input
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("photo_product", { required: "Foto Produk wajib diunggah" })}
              />
              {errors.photo_product && (
                <p className="text-red-500 text-sm">{errors.photo_product.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/listBarang")}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TambahBarangPopup;
