import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Penjualan() {
  const [penjualan, setPenjualan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data penjualan
    const fetchPenjualan = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getPenjualan');
        setPenjualan(response.data.data); // Data dari backend
        setLoading(false);
      } catch (error) {
        console.error('Error saat mengambil data penjualan:', error);
        setError('Gagal mengambil data penjualan.');
        setLoading(false);
      }
    };

    fetchPenjualan();
  }, []);

  // Fungsi untuk menghitung total harga per transaksi
  const calculateTotalHarga = (idCart, totalHarga) => {
    // Jika idCart kosong atau bukan array, gunakan totalHarga dari data langsung
    if (!Array.isArray(idCart) || idCart.length === 0) {
      return totalHarga || 0;
    }
    // Jika idCart ada, lakukan perhitungan berdasarkan isinya
    return idCart.reduce((acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0);
  };

  // Fungsi untuk menghitung total pemasukan
  const calculateTotalPemasukan = () => {
    return penjualan.reduce(
      (total, item) => total + calculateTotalHarga(item.idCart, item.totalHarga),
      0
    );
  };

  // Fungsi untuk ekspor data ke Excel
  const exportToExcel = () => {
    const dataForExcel = penjualan.map((item) => ({
      'ID Penjualan': item.idPenjualan,
      'Nama Customer': item.Customer_id?.Nama_lengkap || 'Tidak ada data',
      'Pembayaran': item.metodePembayaran || 'Tidak ada data',
      'Nama Barang': item.namaBarang || 'Tidak ada data',
      'Total Barang': item.totalBarang || 0,
      'Total Harga': calculateTotalHarga(item.idCart, item.totalHarga),
      'Tanggal Pembelian': item.tanggalPembelian,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Penjualan');
    XLSX.writeFile(workbook, 'Data_Penjualan.xlsx');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data Penjualan</h1>
      <button onClick={exportToExcel} style={{ marginBottom: '20px' }}>
        Ekspor ke Excel
      </button>
      {penjualan.length === 0 ? (
        <p>Tidak ada data penjualan.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID Penjualan</th>
              <th>Customer</th>
              <th>Pembayaran</th>
              <th>Detail</th>
              <th>Total Barang</th>
              <th>Total Harga</th>
              <th>Tanggal Pembelian</th>
            </tr>
          </thead>
          <tbody>
            {penjualan.map((item) => (
              <tr key={item._id}>
                <td>{item.idPenjualan}</td>
                <td>{item.Customer_id?.Nama_lengkap || 'Tidak ada data'}</td>
                <td>{item.metodePembayaran || 'Tidak ada data'}</td>
                <td>{item.namaBarang || 'Tidak ada data'}</td>
                <td>{item.totalBarang || 'Tidak ada data'}</td>
                <td>{calculateTotalHarga(item.idCart, item.totalHarga).toLocaleString('id-ID')}</td>
                <td>{item.tanggalPembelian || 'Tidak ada data'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2 style={{ marginTop: '20px' }}>
        Total Pemasukan: Rp{' '}
        {calculateTotalPemasukan().toLocaleString('id-ID', { minimumFractionDigits: 0 })}
      </h2>
    </div>
  );
}

export default Penjualan;
