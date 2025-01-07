import React, { useEffect, useState } from "react";
import axios from "axios";

function TotalBarangKeluar() {
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data barang keluar
  useEffect(() => {
    const fetchBarangKeluar = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/barangKeluar"
        );
        setBarangKeluar(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchBarangKeluar();
  }, []);

  // Function untuk approve status
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/barangKeluar/status/${id}`,
        { status: "Approve" }
      );
      // Update data di frontend setelah status diubah
      setBarangKeluar((prevBarang) =>
        prevBarang.map((item) =>
          item.Id_barang_keluar === id ? { ...item, Status: "Approve" } : item
        )
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Gagal memperbarui status");
    }
  };

  // Jika masih loading
  if (loading) return <p style={styles.loading}>Loading...</p>;

  // Jika terjadi error
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Daftar Barang Keluar</h1>
      {barangKeluar.length === 0 ? (
        <p style={styles.noData}>Tidak ada data barang keluar</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Photo</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {barangKeluar.map((barang) => (
              <tr key={barang.Id_barang_keluar}>
                <td>{barang.Nama_barang}</td>
                <td>{barang.Jumlah}</td>
                <td>
                  <img
                    src={barang.photo_url}
                    alt={barang.Nama_barang}
                    style={styles.image}
                  />
                </td>
                <td>{barang.Status}</td>
                <td>
                  {barang.Status === "Pending" ? (
                    <button
                      style={styles.button}
                      onClick={() => handleApprove(barang.Id_barang_keluar)}
                    >
                      Approve
                    </button>
                  ) : (
                    <span style={styles.approved}>Approved</span>
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

// CSS-in-JS Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  image: {
    width: "80px",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  approved: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    color: "#666",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#888",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "#e74c3c",
  },
};

export default TotalBarangKeluar;
