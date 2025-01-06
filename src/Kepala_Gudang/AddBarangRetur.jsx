import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from "./../ThemeContext";

function AddBarangRetur() {
  const { isDarkMode } = useTheme();
  const [id_barang, setIdBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState('');
  const [photoProduct, setPhotoProduct] = useState(null);
  const [tanggal, setTanggal] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Theme classes
  const containerClasses = isDarkMode
    ? "max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-gray-800 text-white border-gray-700"
    : "max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white text-gray-900 border-gray-300";

  const titleClasses = isDarkMode
    ? "text-2xl font-bold mb-5 text-white"
    : "text-2xl font-bold mb-5 text-gray-900";

  const labelClasses = isDarkMode
    ? "block font-semibold text-white"
    : "block font-semibold text-gray-900";

  const inputClasses = isDarkMode
    ? "w-full p-2 border border-gray-600 rounded mt-1 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    : "w-full p-2 border border-gray-300 rounded mt-1 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const buttonClasses = isDarkMode
    ? "w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition"
    : "w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition";

  const successMessageClasses = isDarkMode
    ? "bg-green-800 text-green-100 p-2 mb-4 rounded"
    : "bg-green-200 text-green-700 p-2 mb-4 rounded";

  const errorMessageClasses = isDarkMode
    ? "bg-red-800 text-red-100 p-2 mb-4 rounded"
    : "bg-red-200 text-red-700 p-2 mb-4 rounded";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id_barang || !namaBarang || !jumlahBarang || !photoProduct || !tanggal) {
      setError('Semua data wajib diisi');
      setMessage('');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id_barang', id_barang);
      formData.append('namaBarang', namaBarang);
      formData.append('jumlahBarang', jumlahBarang);
      formData.append('photo_product', photoProduct);
      formData.append('tanggal', tanggal);

      const response = await axios.post('http://localhost:3000/api/admin/addReturGudang', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message || 'Barang retur berhasil ditambahkan');
      setError('');
      setIdBarang('');
      setNamaBarang('');
      setJumlahBarang('');
      setPhotoProduct(null);
      setTanggal('');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Terjadi kesalahan saat menambahkan retur');
      setMessage('');
    }
  };

  return (
    <div className={containerClasses}>
      <h1 className={titleClasses}>Tambah Barang Retur</h1>

      {message && <div className={successMessageClasses}>{message}</div>}
      {error && <div className={errorMessageClasses}>{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id_barang" className={labelClasses}>ID Barang</label>
          <input
            type="text"
            id="id_barang"
            value={id_barang}
            onChange={(e) => setIdBarang(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="namaBarang" className={labelClasses}>Nama Barang</label>
          <input
            type="text"
            id="namaBarang"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="jumlahBarang" className={labelClasses}>Jumlah Barang</label>
          <input
            type="number"
            id="jumlahBarang"
            value={jumlahBarang}
            onChange={(e) => setJumlahBarang(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="photo_product" className={labelClasses}>Foto Barang</label>
          <input
            type="file"
            id="photo_product"
            onChange={(e) => setPhotoProduct(e.target.files[0])}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="tanggal" className={labelClasses}>Tanggal Retur</label>
          <input
            type="date"
            id="tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className={buttonClasses}
          >
            Tambah Retur
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBarangRetur;