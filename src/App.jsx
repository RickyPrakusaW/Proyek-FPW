import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";

//punya admin semua
import Home_admin from "./Admin/Home_admin";
import Manage_kariawan from "./Admin/Manage_kariawan";
import Tambah_kariawan from "./Admin/Tambah_kariawan";
import Stock_gudang_admin from "./Admin/Stock_gudang";
import Retur_admin from "./Admin/Retur_admin";
import Add_retur from "./Admin/Add_retur";
import List_barang_admin from "./Admin/List_barang_admin";
import Tambah_barang_admin from "./Admin/Tambah_barang_admin";
import Penjualan from "./Admin/Penjualan";
import Barang_keluar from "./Admin/Barang_keluar";

//punya kepala gudang semua
import Home_kepala_gudang from "./Kepala_Gudang/Home_kepalagudang";
import Stock_gudang_kepala_gudang from "./Kepala_Gudang/Stock_gudang_kepalagudang";
import Tambah_barangmasuuk_kepalagudang from "./Kepala_Gudang/Tambah_barangmasuk_kepalagudang";
import Retur_kepalagudang from "./Kepala_Gudang/Retur_kepalagudang";
import Total_barang from "./Kepala_Gudang/Total_barangMasuk";
import Total_barangKeluar from "./Kepala_Gudang/Total_barangKeluar";

//punya kariawan
import Profile from "./Kariawan/Profile";
import List_barang_kariawan from "./Kariawan/List_barang_kariawan";
import Keranjang from "./Kariawan/Keranjang";
import Checkout from "./Kariawan/Checkout";
import Pembayaran from "./Kariawan/Pembayaran";
// import Retur from "./Kariawan/Retur"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* punya admin semua */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Routes>
                  <Route path="/" element={<Home_admin />} />
                  <Route
                    path="/manage-karyawan"
                    element={<Manage_kariawan />}
                  />
                  <Route
                    path="/tambah-karyawan"
                    element={<Tambah_kariawan />}
                  />
                  <Route
                    path="/stock-gudang"
                    element={<Stock_gudang_admin />}
                  />
                  <Route path="/retur" element={<Retur_admin />} />
                  <Route path="/add-retur" element={<Add_retur />} />
                  <Route path="/list-barang" element={<List_barang_admin />} />
                  <Route
                    path="/tambah-barang"
                    element={<Tambah_barang_admin />}
                  />
                  <Route path="/penjualan" element={<Penjualan />} />
                  <Route path="/barang-keluar" element={<Barang_keluar />} />
                </Routes>
              </ProtectedRoute>
            }
          />
          {/* punya kepala gudang semua */}
          <Route
            path="/kepalagudang/*"
            element={
              <ProtectedRoute allowedRoles={["kepala_gudang"]}>
                <Routes>
                  <Route path="/" element={<Home_kepala_gudang />} />
                  <Route
                    path="/stock-gudang"
                    element={<Stock_gudang_kepala_gudang />}
                  />
                  <Route
                    path="/tambah-barang"
                    element={<Tambah_barangmasuuk_kepalagudang />}
                  />
                  <Route path="/retur" element={<Retur_kepalagudang />} />
                  <Route path="/total-barang" element={<Total_barang />} />
                  <Route
                    path="/total-barang-keluar"
                    element={<Total_barangKeluar />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* punya kariawan */}
          <Route
            path="/karyawan/*"
            element={
              <ProtectedRoute allowedRoles={["karyawan"]}>
                <Routes>
                  <Route path="/" element={<Profile />} />
                  <Route
                    path="/list-barang"
                    element={<List_barang_kariawan />}
                  />
                  <Route path="/keranjang" element={<Keranjang />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pembayaran" element={<Pembayaran />} />
                </Routes>
              </ProtectedRoute>
            }
          />
          {/* <Route path="/Retur" element={<Retur />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
