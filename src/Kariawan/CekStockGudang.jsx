import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CekStockGudang.css';
function CekStockGudang() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/admin/getStock') // Sesuaikan URL ini
      .then((response) => {
        console.log('Response data:', response.data); // Debug log
        setStocks(response.data.data || []); // Pastikan ada fallback
      })
      .catch((err) => {
        console.error('Error fetching data:', err.response || err.message); // Debug log
        setError('Gagal mengambil data stock.');
      });
  }, []);

  return (
    <div className="cek-stock-container">
      <h1>Stock Gudang</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="card-container">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <div key={stock._id_stock} className="stock-card">
              <h2>{stock.nama_barang}</h2>
              <p>Jumlah: {stock.total_barang}</p>
              <p>Kategori: {stock.tipe_barang}</p>
            </div>
          ))
        ) : (
          <p>Data stock tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}

export default CekStockGudang;
