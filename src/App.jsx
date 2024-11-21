import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Home_admin from "./Admin/Home_admin"
import Manage_kariawan from "./Admin/Manage_kariawan"
import Tambah_kariawan from "./Admin/Tambah_kariawan"
import Stock_gudang_admin from "./Admin/Stock_gudang"
import Retur_admin from "./Admin/Retur_admin"
import Add_retur from "./Admin/Add_retur"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Homeadmin" element={<Home_admin />} />
        <Route path="/Managekariawan" element={<Manage_kariawan />} />
        <Route path="/Tambahkariawan" element={<Tambah_kariawan />} />
        <Route path="/Stockgudangadmin" element={<Stock_gudang_admin />} />
        <Route path="/Returadmin" element={<Retur_admin />} />
        <Route path="/Addretur" element={<Add_retur />} />
      </Routes>
    </Router>
  );
}

export default App;
