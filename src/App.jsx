import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
//punya admin semua 
import Home_admin from "./Admin/Home_admin"
import Manage_kariawan from "./Admin/Manage_kariawan"
import Tambah_kariawan from "./Admin/Tambah_kariawan"
import Stock_gudang_admin from "./Admin/Stock_gudang"
import Retur_admin from "./Admin/Retur_admin"
import Add_retur from "./Admin/Add_retur"
import List_barang_admin from "./Admin/List_barang_admin"
import Tambah_barang_admin from "./Admin/Tambah_barang_admin"

//punya kepala gudang semua
import Home_kepala_gudang from "./Kepala_Gudang/Home_kepalagudang"
import Stock_gudang_kepala_gudang from "./Kepala_Gudang/Stock_gudang_kepalagudang"
import Tambah_barangmasuuk_kepalagudang from "./Kepala_Gudang/Tambah_barangmasuk_kepalagudang"
import Retur_kepalagudang from "./Kepala_Gudang/Retur_kepalagudang"

//punya kariawan
import Profile from "./Kariawan/Profile"
import List_barang_kariawan from "./Kariawan/List_barang_kariawan"
import Keranjang from "./Kariawan/Keranjang"
import Checkout from "./Kariawan/Checkout"
import Pembayaran from "./Kariawan/Pembayaran";
import Retur from "./Kariawan/Retur"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* punya admin semua */}
        <Route path="/Homeadmin" element={<Home_admin />} />
        <Route path="/Managekariawan" element={<Manage_kariawan />} />
        <Route path="/Tambahkariawan" element={<Tambah_kariawan />} />
        <Route path="/Stockgudangadmin" element={<Stock_gudang_admin />} />
        <Route path="/Returadmin" element={<Retur_admin />} />
        <Route path="/Addretur" element={<Add_retur />} />
        <Route path="/List_barang_admin" element={<List_barang_admin />} />
        <Route path="/Tambah_barang_admin" element={<Tambah_barang_admin />} />

        {/* punya kepala gudang semua */}
        <Route path="/Homekepalagudang" element={<Home_kepala_gudang />} />
        <Route path="/Stockgudangkepalagudang" element={<Stock_gudang_kepala_gudang />} />
        <Route path="/Tambahbarangmasuukkepalagudang" element={<Tambah_barangmasuuk_kepalagudang />} />
        <Route path="/Returkepalagudang" element={<Retur_kepalagudang />} />

        {/* punya kariawan */}
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Listbarangkariawan" element={<List_barang_kariawan />} />
        <Route path="/Keranjang" element={<Keranjang />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Pembayaran" element={<Pembayaran />} />
        <Route path="/Retur" element={<Retur />} />

      </Routes>
    </Router>
  );
}

export default App;
