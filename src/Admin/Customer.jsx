import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import library XLSX untuk ekspor Excel

function Customer() {
  const [customers, setCustomers] = useState([]); // State untuk menyimpan data customer
  const [loading, setLoading] = useState(true);   // State untuk loading status
  const [error, setError] = useState(null);       // State untuk error handling

  useEffect(() => {
    // Mengambil data customer dari backend saat komponen dimuat
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getCustomers'); // Panggil API backend
        setCustomers(response.data.data); // Set state dengan data pelanggan
        setLoading(false); // Matikan loading
      } catch (err) {
        console.error('Error saat mengambil data pelanggan:', err.message);
        setError('Gagal mengambil data pelanggan. Silakan coba lagi.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); // Dependency array kosong, jadi dijalankan sekali saat komponen dimuat

  // Fungsi untuk mengekspor data ke file Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers); // Konversi data JSON ke sheet
    const workbook = XLSX.utils.book_new(); // Membuat file workbook baru
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Pelanggan'); // Tambahkan sheet ke workbook
    XLSX.writeFile(workbook, 'Data_Pelanggan.xlsx'); // Unduh file Excel
  };

  if (loading) return <p className="text-center mt-5">Memuat data pelanggan...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Daftar Data Pelanggan</h1>
      <button
        onClick={exportToExcel}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
      >
        Ekspor ke Excel
      </button>
      {customers.length === 0 ? (
        <p className="text-center">Tidak ada pelanggan yang tersedia.</p>
      ) : (
        <table className="table-auto mx-auto w-full max-w-4xl border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID Pelanggan</th>
              <th className="border border-gray-300 px-4 py-2">Nama Lengkap</th>
              <th className="border border-gray-300 px-4 py-2">No Telepon</th>
              <th className="border border-gray-300 px-4 py-2">Alamat</th>
              <th className="border border-gray-300 px-4 py-2">Kota</th>
              <th className="border border-gray-300 px-4 py-2">Negara</th>
              <th className="border border-gray-300 px-4 py-2">Kode Pos</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.Customer_id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{customer.Customer_id}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.Nama_lengkap}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.No_telepone}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.Alamat}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.Kota}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.Negara}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.Kodepos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customer;
