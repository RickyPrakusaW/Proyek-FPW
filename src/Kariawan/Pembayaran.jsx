import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Pembayaran() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data dari state navigasi
  const { totalBelanja, formData, cartItems } = location.state || {
    totalBelanja: 0,
    formData: {},
    cartItems: [],
  };

  // State untuk metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState("");

  // Fungsi untuk memformat tanggal
  const formatTanggal = (date) => {
    const d = new Date(date);
    const pad = (n) => (n < 10 ? "0" + n : n); // Tambahkan 0 di depan angka 1 digit
    return (
      `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}, ` +
      `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    );
  };

  // Fungsi untuk mengirim data pembayaran ke backend
  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    try {
      // Simpan data pelanggan ke backend
      const customerResponse = await fetch("http://localhost:3000/api/admin/addCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!customerResponse.ok) {
        const errorData = await customerResponse.json();
        throw new Error(errorData.error || "Gagal menambahkan pelanggan.");
      }

      const customerData = await customerResponse.json();

      // Format tanggal pembelian ke format DD/MM/YYYY, HH:mm:ss
      const formattedDate = formatTanggal(new Date());

      // Simpan data penjualan ke backend
      const salesResponse = await fetch("http://localhost:3000/api/admin/addPenjualan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customerData.data._id,
          cartId: cartItems.map((item) => item._id),
          status: true, // Status penjualan
          totalHarga: totalBelanja,
          metodePembayaran: paymentMethod,
          tanggalPembelian: formattedDate, // Tanggal dalam format DD/MM/YYYY, HH:mm:ss
        }),
      });

      if (!salesResponse.ok) {
        const errorData = await salesResponse.json();
        throw new Error(errorData.error || "Gagal menyelesaikan penjualan.");
      }

      const salesData = await salesResponse.json();
      console.log("Sales data:", salesData);

      alert("Pembayaran berhasil!");
      navigate("/karyawan"); // Redirect ke halaman utama karyawan
    } catch (error) {
      console.error("Error selama pembayaran:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="p-6">
          <h1 className="text-xl font-bold text-center">Pembayaran</h1>
          <hr className="my-4" />

          <div className="space-y-6">
            {/* Pilihan Metode Pembayaran */}
            <div
              className={`flex items-center justify-between p-4 rounded-md cursor-pointer ${
                paymentMethod === "transfer" ? "bg-blue-300" : "bg-blue-100"
              }`}
              onClick={() => setPaymentMethod("transfer")}
            >
              <div>
                <h2 className="text-lg font-bold text-blue-600">BCA Transfer</h2>
                <p className="text-sm text-gray-700">012345678912 - Michael</p>
              </div>
              <img
                src="https://via.placeholder.com/50"
                alt="BCA Logo"
                className="w-12 h-12"
              />
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-md cursor-pointer ${
                paymentMethod === "cash" ? "bg-yellow-300" : "bg-yellow-100"
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <div>
                <h2 className="text-lg font-bold text-yellow-600">Cash</h2>
                <p className="text-sm text-gray-700">Bayar secara tunai</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 flex items-center justify-center rounded-md text-white">
                💵
              </div>
            </div>
          </div>

          {/* Total Tagihan */}
          <div className="mt-6">
            <div className="flex justify-between px-4 py-2 text-lg font-bold bg-gray-100 rounded-md">
              <span>Total Tagihan:</span>
              <span>Rp. {totalBelanja}</span>
            </div>
          </div>

          {/* Data Pelanggan */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Data Pelanggan:</h3>
            <p>Nama: {formData.Nama_lengkap}</p>
            <p>No Telepon: {formData.No_telepone}</p>
            <p>Alamat: {formData.Alamat}, {formData.Kota}, {formData.Negara}</p>
            <p>Kode Pos: {formData.Kodepos}</p>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-between mt-6 space-x-4">
            <button
              className="w-1/2 px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600"
              onClick={() => navigate(-1)}
            >
              Kembali
            </button>
            <button
              className="w-1/2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={handlePayment}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pembayaran;
