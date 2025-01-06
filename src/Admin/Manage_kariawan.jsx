import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import * as XLSX from "xlsx"; // Import xlsx library

const ManageKaryawan = () => {
  const navigate = useNavigate();
  const [karyawans, setKaryawans] = useState([]);
  const [filteredKaryawans, setFilteredKaryawans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const tableClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-100 text-gray-900";

  // Fetch data karyawan
  useEffect(() => {
    const fetchKaryawans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getKaryawan"
        );
        const data = response.data?.data || []; // Validasi data
        setKaryawans(data);
        setFilteredKaryawans(data);
      } catch (err) {
        setError("Gagal memuat data karyawan. Coba lagi nanti.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryawans();
  }, []);

  // Update filtered data when search query changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const result = karyawans.filter(
      (karyawan) =>
        karyawan.nama_lengkap.toLowerCase().includes(lowerCaseQuery) ||
        karyawan.id_karyawan.toString().includes(lowerCaseQuery)
    );
    setFilteredKaryawans(result);
  }, [searchQuery, karyawans]);

  // Update status karyawan
  const updateStatusKaryawan = async (id, newStatus) => {
    if (
      !window.confirm(
        `Apakah Anda yakin ingin mengubah status menjadi ${newStatus}?`
      )
    )
      return;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/updateStatusKaryawan/${id}`,
        { status: newStatus }
      );
      if (response.status === 200) {
        setKaryawans((prevKaryawans) =>
          prevKaryawans.map((karyawan) =>
            karyawan.id_karyawan === id
              ? { ...karyawan, status: newStatus }
              : karyawan
          )
        );
      }
    } catch (err) {
      setError("Gagal memperbarui status karyawan.");
      console.error("Update error:", err);
    }
  };

  const closePopup = () => setSelectedKaryawan(null);

  // Function to export the data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredKaryawans); // Convert filtered data to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Karyawan"); // Append worksheet to the workbook
    XLSX.writeFile(wb, "Karyawan_List.xlsx"); // Download the file as 'Karyawan_List.xlsx'
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${themeClasses}`}
      >
        <div className="text-center">
          <p className="text-xl font-bold">Memuat data karyawan...</p>
          <div className="mt-3 animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${themeClasses}`}
      >
        <div className="text-center">
          <p className="text-xl text-red-500 font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 bg-blue-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Daftar Karyawan</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Cari Nama atau ID"
              className={`px-4 py-2 rounded-md shadow ${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold hover:bg-green-600"
              onClick={() => navigate("/admin/addKaryawan")}
            >
              + Tambah Karyawan
            </button>
            <button
              className="bg-blue-500 px-5 py-2 rounded-md text-white font-semibold hover:bg-blue-600"
              onClick={exportToExcel}
            >
              Export ke Excel
            </button>
            <span className="ml-5 text-lg font-medium">
              Total Karyawan: {filteredKaryawans.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr
                className={`text-white ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-400"
                }`}
              >
                <th className="p-4 border">ID</th>
                <th className="p-4 border">Nama Lengkap</th>
                <th className="p-4 border">Tempat Lahir</th>
                <th className="p-4 border">Tanggal Lahir</th>
                <th className="p-4 border">Jenis Kelamin</th>
                <th className="p-4 border">Golongan Darah</th>
                <th className="p-4 border">No Telepon</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKaryawans.length > 0 ? (
                filteredKaryawans.map((karyawan, index) => (
                  <tr
                    key={karyawan.id_karyawan}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 border text-center text-black">
                      {karyawan.id_karyawan}
                    </td>
                    <td className="p-3 border text-center text-black">
                      {karyawan.nama_lengkap}
                    </td>
                    <td className="p-3 border text-center text-black">
                      {karyawan.tempat_lahir}
                    </td>
                    <td className="p-3 border text-center text-black">
                      {
                        new Date(karyawan.tanggal_lahir)
                          .toISOString()
                          .split("T")[0]
                      }
                    </td>
                    <td className="p-3 border text-center text-black">
                      {karyawan.jenis_kelamin}
                    </td>
                    <td className="p-3 border text-center text-black">
                      {karyawan.golongan_darah}
                    </td>
                    <td className="p-3 border text-center text-black">
                      {karyawan.no_telepon}
                    </td>
                    <td
                      className={`p-3 border text-center font-bold ${
                        karyawan.status === "Aktif"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {karyawan.status}
                    </td>
                    <td className="p-3 border text-center space-x-2">
                      <button
                        className="bg-blue-500 px-3 py-1 rounded-md text-white font-semibold hover:bg-blue-600"
                        onClick={() => setSelectedKaryawan(karyawan)}
                      >
                        Detail
                      </button>
                      <button
                        className={`px-3 py-1 rounded-md text-white font-semibold ${
                          karyawan.status === "Aktif"
                            ? "bg-pink-500 hover:bg-pink-600"
                            : "bg-purple-500 hover:bg-purple-600"
                        }`}
                        onClick={() =>
                          updateStatusKaryawan(
                            karyawan.id_karyawan,
                            karyawan.status === "Aktif" ? "Nonaktif" : "Aktif"
                          )
                        }
                      >
                        {karyawan.status === "Aktif"
                          ? "Nonaktifkan"
                          : "Aktifkan"}
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

        {/* Popup */}
        {selectedKaryawan && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div
              className={`p-6 rounded-md shadow-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">Detail Karyawan</h3>
              <img
                src={selectedKaryawan.foto || "https://via.placeholder.com/150"}
                alt={selectedKaryawan.nama_lengkap}
                className="w-32 h-32 rounded-full mb-4 mx-auto"
              />
              <p>
                <strong>Nama:</strong> {selectedKaryawan.nama_lengkap}
              </p>
              <p>
                <strong>Alamat:</strong> {selectedKaryawan.alamat || "-"}
              </p>
              <p>
                <strong>Jenis Kelamin:</strong> {selectedKaryawan.jenis_kelamin}
              </p>
              <p>
                <strong>Golongan Darah:</strong>{" "}
                {selectedKaryawan.golongan_darah}
              </p>
              <p>
                <strong>No Telepon:</strong> {selectedKaryawan.no_telepon}
              </p>
              <p>
                <strong>Status:</strong> {selectedKaryawan.status}
              </p>
              <div className="mt-4 text-right">
                <button
                  className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-600"
                  onClick={closePopup}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageKaryawan;
