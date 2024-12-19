import React, { useState } from 'react';
import axios from 'axios';

function AddBarangRetur() {
  const [id_stock, setIdStock] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  const [photo_product, setphoto_product] = useState(null); // Untuk file
  const [tanggal, setTanggal] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input form
    if (!id_stock || !namaBarang || !jumlahBarang || !photo_product || !tanggal) {
      setError('Semua data wajib diisi');
      return;
    }

    try {
      // Buat FormData untuk mengunggah file
      const formData = new FormData();
      formData.append('id_stock', id_stock);
      formData.append('namaBarang', namaBarang);
      formData.append('jumlahBarang', jumlahBarang);
      formData.append('photo_product', photo_product); // File diunggah sebagai blob
      formData.append('tanggal', tanggal);

      // Mengirim data ke backend API
      const response = await axios.post('http://localhost:3000/api/admin/addReturGudang', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Header untuk file upload
        },
      });

      // Menampilkan pesan sukses
      setMessage(response.data.message || 'Barang retur berhasil ditambahkan');
      setError('');
      // Reset form
      setIdStock('');
      setNamaBarang('');
      setJumlahBarang('');
      setphoto_product(null);
      setTanggal('');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Terjadi kesalahan saat menambahkan retur');
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
          <label htmlFor="id_stock" className="block font-semibold">ID Stock</label>
          <input
            type="text"
            id="id_stock"
            value={id_stock}
            onChange={(e) => setIdStock(e.target.value)}
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
          <label htmlFor="photo_product" className="block font-semibold">Foto Barang</label>
          <input
            type="file"
            id="photo_product"
            onChange={(e) => setphoto_product (e.target.files[0])} // File input
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
