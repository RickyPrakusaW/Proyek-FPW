import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setIdPenjualan } from "../../redux/idPenjualanSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getCart");
        if (!response.ok) {
          throw new Error("Gagal mengambil data keranjang.");
        }
        const data = await response.json();
        setCartItems(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const totalBelanja = cartItems.reduce(
    (total, item) => total + item.harga * item.totalProduct,
    0
  );

  const handleCheckout = async () => {
    const Nama_lengkap = document.getElementById("Nama_lengkap").value;
    const No_telepone = document.getElementById("No_telepone").value;
    const Alamat = document.getElementById("Alamat").value;
    const Kota = document.getElementById("Kota").value;
    const Negara = document.getElementById("Negara").value;
    const Kodepos = document.getElementById("Kodepos").value;
  
    if (!Nama_lengkap || !No_telepone || !Alamat || !Kota || !Negara || !Kodepos) {
      alert("Semua data pelanggan harus diisi.");
      return;
    }
  
    const customerData = {
      Nama_lengkap,
      No_telepone,
      Alamat,
      Kota,
      Negara,
      Kodepos,
    };
  
    try {
      // Kirim data customer ke endpoint `/addCustomer`
      const customerResponse = await fetch("http://localhost:3000/api/admin/addCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });
  
      const customerResult = await customerResponse.json();
  
      if (!customerResponse.ok) {
        alert(customerResult.error || "Gagal menambahkan customer.");
        return;
      }
  
      // Ambil ID Customer dari respons
      const { data: newCustomer } = customerResult;
  
      // Kirim data penjualan ke endpoint `/addPenjualan`
      const penjualanData = {
        customer: newCustomer, // Data customer dari respons
        cartItems: cartItems,
        totalBelanja,
      };
  
      const penjualanResponse = await fetch("http://localhost:3000/api/admin/addPenjualan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(penjualanData),
      });
  
      const penjualanResult = await penjualanResponse.json();
  
      if (penjualanResponse.ok) {
        dispatch(setIdPenjualan(penjualanResult.idPenjualan))
        alert(penjualanResult.message);
        navigate("/karyawan/pembayaran");
      } else {
        alert(penjualanResult.error);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data ke server.");
      console.error(error);
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-black">Proses Checkout</h1>

          {loading && <p className="text-black">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="mb-4 text-xl font-semibold text-black">Informasi Data Pelanggan</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-black">Nama Lengkap</label>
                    <input
                      id="Nama_lengkap"
                      type="text"
                      placeholder="Nama Lengkap"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">No Telepone</label>
                    <input
                      id="No_telepone"
                      type="text"
                      placeholder="No Telepone"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Alamat</label>
                    <input
                      id="Alamat"
                      type="text"
                      placeholder="Alamat"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Kota</label>
                    <input
                      id="Kota"
                      type="text"
                      placeholder="Kota"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Negara</label>
                    <input
                      id="Negara"
                      type="text"
                      placeholder="Negara"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Kodepos</label>
                    <input
                      id="Kodepos"
                      type="text"
                      placeholder="Kodepos"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 text-black"
                    />
                  </div>
                </form>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-black">Pesanan</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-black">{item.namaBarang}</h3>
                        <p className="text-sm text-black">Jumlah: {item.totalProduct}</p>
                        <p className="text-sm text-black">Rp. {item.harga * item.totalProduct}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        📦
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <h3 className="text-lg font-bold text-black">Total: Rp. {totalBelanja}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              className="px-6 py-3 text-white rounded-lg bg-green-500 hover:bg-green-600"
              onClick={handleCheckout}
            >
              Pembayaran
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
