import React, { useState } from 'react';
import axios from 'axios';

function AddBarangRetur() {
  const [idBarang, setIdBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  const [photoBarang, setPhotoBarang] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input form
    if (!idBarang || !namaBarang || !jumlahBarang || !photoBarang || !tanggal) {
      setError('Semua data wajib diisi');
      return;
    }

    try {
      // Mengirim data ke backend API
      const response = await axios.post('http://localhost:3000/api/admin/addReturGudang', {
        idBarang,
        namaBarang,
        jumlahBarang,
        photoBarang,
        tanggal,
      });

      // Menampilkan pesan sukses
      setMessage('Barang retur berhasil ditambahkan');
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Terjadi kesalahan saat menambahkan retur');
      setMessage('');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Tambah Barang Retur</h1>

      {/* Menampilkan pesan sukses atau error */}
      {message && <div className="bg-green-200 text-green-700 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">{error}</div>}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="idBarang" className="block font-semibold">ID Barang</label>
          <input
            type="text"
            id="idBarang"
            value={idBarang}
            onChange={(e) => setIdBarang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="namaBarang" className="block font-semibold">Nama Barang</label>
          <input
            type="text"
            id="namaBarang"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="jumlahBarang" className="block font-semibold">Jumlah Barang</label>
          <input
            type="number"
            id="jumlahBarang"
            value={jumlahBarang}
            onChange={(e) => setJumlahBarang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="photoBarang" className="block font-semibold">Foto Barang (URL)</label>
          <input
            type="text"
            id="photoBarang"
            value={photoBarang}
            onChange={(e) => setPhotoBarang(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="tanggal" className="block font-semibold">Tanggal Retur</label>
          <input
            type="date"
            id="tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Tambah Retur
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBarangRetur;
