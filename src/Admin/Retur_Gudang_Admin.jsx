import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Retur_Gudang_Admin() {
  const [returGudang, setReturGudang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data retur gudang dari API
  useEffect(() => {
    const fetchReturGudang = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getReturGudang');
        setReturGudang(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchReturGudang();
  }, []);

  // Fungsi untuk mengubah status menjadi "Approve"
  const handleApprove = async (idReturGudang) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/admin/updateStatusRetur/${idReturGudang}`, {
        status: 'approve',
      });

      // Update status di frontend tanpa refresh
      setReturGudang((prev) =>
        prev.map((retur) =>
          retur.idReturGudang === idReturGudang ? { ...retur, status: 'approve' } : retur
        )
      );
      alert('Status berhasil diperbarui menjadi Approve!');
    } catch (err) {
      alert(err.response?.data?.error || 'Terjadi kesalahan saat memperbarui status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Daftar Retur Gudang</h1>
      {returGudang.length === 0 ? (
        <p>Tidak ada data retur ditemukan</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID Barang</th>
              <th>Nama Barang</th>
              <th>Jumlah Retur</th>
              <th>Keterangan</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returGudang.map((retur) => (
              <tr key={retur.idReturGudang}>
                <td>{retur.idReturGudang}</td>
                <td>{retur.namaBarang || 'N/A'}</td>
                <td>{retur.jumlahBarang}</td>
                <td>{retur.keterangan || 'Tidak ada'}</td>
                <td>{retur.status}</td>
                <td>
                  {retur.status !== 'approve' ? (
                    <button onClick={() => handleApprove(retur.idReturGudang)}>Approve</button>
                  ) : (
                    <p>Approved</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Retur_Gudang_Admin;
