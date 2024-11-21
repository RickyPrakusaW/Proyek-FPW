import React from "react";
import { useNavigate } from "react-router-dom";
function Checkout() {
    const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-5 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-xl font-bold text-blue-600">Tiok</h2>
        {/* Menu */}
        <div className="mt-8 space-y-4 w-full">
          <button className="w-full text-left text-gray-600 hover:text-blue-600"  onClick={() => navigate("/Listbarangkariawan")}>
            List Barang
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600" onClick={() => navigate("/Keranjang")}>
            Keranjang
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600">
            Cek Stok Gudang
          </button>
        </div>
        {/* Logout Button */}
        <button className="mt-auto px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600">
          Keluar
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">Proses</h1>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Formulir Data Pelanggan */}
            <div className="col-span-2">
              <h2 className="mb-4 text-xl font-semibold">
                Informasi data pelanggan
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Nomor Telepon</label>
                  <input
                    type="text"
                    placeholder="Nomor Telepon"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Alamat</label>
                  <textarea
                    placeholder="Alamat"
                    className="w-full px-4 py-2 border rounded-md"
                    rows="3"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Kota</label>
                    <input
                      type="text"
                      placeholder="Kota"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Kode Pos</label>
                    <input
                      type="text"
                      placeholder="Kode Pos"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Negara</label>
                  <input
                    type="text"
                    placeholder="Negara"
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
              </form>
            </div>

            {/* Pesanan */}
            <div className="p-4 bg-blue-50 rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Pesanan</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Produk 1</h3>
                    <p className="text-sm">Jumlah: 2</p>
                    <p className="text-sm">Rp. 20,000</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                    📦
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">Produk 2</h3>
                    <p className="text-sm">Jumlah: 1</p>
                    <p className="text-sm">Rp. 15,000</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                    📦
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-300 pt-4">
                <h3 className="text-lg font-bold">Total: Rp. 35,000</h3>
              </div>
            </div>
          </div>

          {/* Tombol Pembayaran */}
          <div className="mt-6 text-right">
            <button className="px-6 py-3 text-white bg-green-500 rounded-lg" onClick={() => navigate("/Pembayaran")}>
              Pembayaran
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
