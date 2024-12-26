import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data Penjualan</h1>
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
              <th>Total Harga</th>
              <th>Total Barang</th>
              <th>Tanggal Pembelian</th>
            </tr>
          </thead>
          <tbody>
            {penjualan.map((item) => {
              // Pastikan idCart adalah array sebelum menggunakan reduce
              const totalHarga = Array.isArray(item.idCart) ? item.idCart.reduce((acc, cartItem) => {
                // Asumsikan cartItem memiliki properti price
                return acc + (cartItem.price * cartItem.quantity);
              }, 0) : 0; // Jika bukan array, set totalHarga ke 0

              return (
                <tr key={item._id}>
                  <td>{item.idPenjualan}</td>
                  <td>{item.Customer_id?.Nama_lengkap  || 'Tidak ada data'}</td>
                  <td>{item.metodePembayaran ||'Tidak ada data'}</td>
                  <td>{item.namaBarang ||'Tidak ada data'}</td>
                  <td>{item.totalBarang ||'Tidak ada data'}</td>
                  <td>{item.totalHarga ||'Tidak ada data'}</td>
                  <td>{item.tanggalPembelian ||'Tidak ada data'}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Penjualan;
