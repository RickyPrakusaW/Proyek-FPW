import React, { useState } from "react";

const TambahBarangKeluarKepalaGudang = () => {
  const [idBarang, setIdBarang] = useState(""); // Updated key name to match backend
  const [jumlahKeluar, setJumlahKeluar] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(null);
    setErrorMessage(null);

    // Validate jumlah_keluar to be a positive number
    if (jumlahKeluar <= 0) {
      setErrorMessage("Jumlah keluar harus lebih besar dari 0!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/barangKeluar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_barang: idBarang, // Send the correct key to backend
          jumlah_keluar: parseInt(jumlahKeluar),
          tanggal_keluar: tanggalKeluar,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message); // Set success message
      } else {
        setErrorMessage(data.error); // Set error message
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Tambah Barang Keluar</h1>
        <form onSubmit={handleSubmit}>
          {/* ID Barang */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              ID Barang
            </label>
            <input
              type="text"
              placeholder="Masukkan ID Barang"
              value={idBarang}
              onChange={(e) => setIdBarang(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Jumlah Barang Keluar */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Jumlah Barang Keluar
            </label>
            <input
              type="number"
              placeholder="Masukkan Jumlah Barang Keluar"
              value={jumlahKeluar}
              onChange={(e) => setJumlahKeluar(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Tanggal Keluar */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tanggal Keluar
            </label>
            <input
              type="date"
              value={tanggalKeluar}
              onChange={(e) => setTanggalKeluar(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>

        {/* Response Messages */}
        {responseMessage && (
          <div className="mt-4 p-2 text-green-700 bg-green-100 rounded">
            {responseMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-2 text-red-700 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TambahBarangKeluarKepalaGudang;
