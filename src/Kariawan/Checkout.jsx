import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  // State untuk form pelanggan
  const [formData, setFormData] = useState({
    Nama_lengkap: "",
    No_telepone: "",
    Alamat: "",
    Kota: "",
    Negara: "",
    Kodepos: "",
  });

  // State untuk keranjang
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data keranjang
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

  // Total belanja
  const totalBelanja = cartItems.reduce(
    (total, item) => total + item.harga * item.totalProduct,
    0
  );

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validasi input pelanggan
  const validateForm = () => {
    const { Nama_lengkap, No_telepone, Alamat, Kota, Negara, Kodepos } = formData;
    if (!Nama_lengkap || !No_telepone || !Alamat || !Kota || !Negara || !Kodepos) {
      alert("Semua data pelanggan harus diisi.");
      return false;
    }
    return true;
  };

  // Handle submit data pelanggan dan pesanan
  const handleCheckout = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Kirim data pelanggan ke backend
      const customerResponse = await fetch(
        "http://localhost:3000/api/admin/addCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!customerResponse.ok) {
        const errorData = await customerResponse.json();
        throw new Error(errorData.error || "Gagal menambahkan pelanggan.");
      }

      const customerData = await customerResponse.json();

      // Kirim data penjualan ke backend
      const orderResponse = await fetch(
        "http://localhost:3000/api/admin/addPenjualan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: customerData.data._id, // ID pelanggan dari backend
            cartId: cartItems.map((item) => item._id), // Kirim ID cart item
            status: true, // Contoh status penjualan
          }),
        }
      );

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || "Gagal menyelesaikan penjualan.");
      }

      const orderData = await orderResponse.json();
      console.log("Order Response:", orderData);

      // Redirect ke halaman pembayaran
      navigate("/Pembayaran");
    } catch (err) {
      console.error("Error saat checkout:", err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Proses Checkout</h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="mb-4 text-xl font-semibold">Informasi Data Pelanggan</h2>
                <form className="space-y-4">
                  {Object.keys(formData).map((key) => (
                    <div key={key}>
                      <label className="block text-gray-700">
                        {key.replace("_", " ")}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        placeholder={key.replace("_", " ")}
                        className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                      />
                    </div>
                  ))}
                </form>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Pesanan</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <div>
                        <h3 className="font-bold">{item.namaBarang}</h3>
                        <p className="text-sm">Jumlah: {item.totalProduct}</p>
                        <p className="text-sm">Rp. {item.harga * item.totalProduct}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        📦
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <h3 className="text-lg font-bold">Total: Rp. {totalBelanja}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              className={`px-6 py-3 text-white rounded-lg ${
                isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Proses..." : "Pembayaran"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
