import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetailKaryawan = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const navigate = useNavigate();
  const [karyawan, setKaryawan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailKaryawan = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/getKaryawan/${id}`);
        if (response.data && response.data.data) {
          setKaryawan(response.data.data);
        } else {
          setError("Data karyawan tidak ditemukan.");
        }
      } catch (err) {
        setError("Gagal memuat data karyawan. Coba lagi nanti.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailKaryawan();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl font-bold">Memuat detail karyawan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
      >
        Kembali
      </button>
      <h1 className="text-2xl font-bold mb-4">Detail Karyawan</h1>
      {karyawan ? (
        <div className="space-y-4">
          <p><strong>ID:</strong> {karyawan.id_karyawan || "Tidak tersedia"}</p>
          <p><strong>Nama Lengkap:</strong> {karyawan.nama_lengkap || "Tidak tersedia"}</p>
          <p><strong>Tempat Lahir:</strong> {karyawan.tempat_lahir || "Tidak tersedia"}</p>
          <p><strong>Tanggal Lahir:</strong> {karyawan.tanggal_lahir || "Tidak tersedia"}</p>
          <p><strong>Jenis Kelamin:</strong> {karyawan.jenis_kelamin || "Tidak tersedia"}</p>
          <p><strong>Golongan Darah:</strong> {karyawan.golongan_darah || "Tidak tersedia"}</p>
          <p><strong>No Telepon:</strong> {karyawan.no_telepon || "Tidak tersedia"}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-bold ${karyawan.status === "Aktif" ? "text-green-500" : "text-red-500"}`}>
              {karyawan.status || "Tidak tersedia"}
            </span>
          </p>
        </div>
      ) : (
        <p>Data karyawan tidak ditemukan.</p>
      )}
    </div>
  );
};

export default DetailKaryawan;
