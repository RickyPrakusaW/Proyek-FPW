import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login"
import HomeAdmin from "./Admin/Home_admin"
import HomeKepalaGudang from "./Kepala_Gudang/Home_kepalagudang";
import HomeKaryawan from "./Kariawan/Profile"
import AddKaryawan from "./Admin/Tambah_kariawan"
import AdminPage from "./AdminPage"
import KepalaGudangPage from "./KepalaGudangPage"
import ManageKaryawan from "./Admin/Manage_kariawan"
import StockGudang from "./Admin/Stock_gudang"
import ReturAdmin from "./Admin/Retur_admin"
import ListBarang from "./Admin/List_barang_admin"
import TambahBarang from "./Admin/Tambah_barang_admin"
import StockGudang2 from './Kepala_Gudang/Stock_gudang_kepalagudang'
import TambahBarangMasuk from './Kepala_Gudang/Tambah_barangmasuk_kepalagudang'
import TambahBarangKeluar from './Kepala_Gudang/Tambah_barangkeluar_kepalagudang'
import ReturKepalaGudang from './Kepala_Gudang/Retur_kepalagudang'
import TotalBarang from './Kepala_Gudang/Total_barangMasuk'
import TotalBarangKeluar from './Kepala_Gudang/Total_barangKeluar'
import PenjualanToday from './Admin/Penjualan'
import ProfileAdmin from "./Admin/ProfileAdmin";
import TotalBarangKeluar2 from "./Admin/TotalBarangKeluar";
import DetailBarang from './Admin/DetailBarang'
import Customer from './Admin/Customer'
import Detailkariawan from './Admin/Detail_kariawan'
import Update_kariawan from './Admin/Update_kariawan'
import AddBarangRetur from "./Kepala_Gudang/AddBarangRetur";
import KaryawanPage from "./KaryawanPage"
import List_barang_kariawan from "./Kariawan/List_barang_kariawan";
import CekStockGudang from "./Kariawan/CekStockGudang";
//admin
import Chatadmin from"./Admin/Chat"

//kepala gudang 

import { ThemeProvider } from "./ThemeContext"; // Import ThemeProvider
import "./index.css"; // Untuk memuat Tailwind CSS
import Keranjang from "./Kariawan/Keranjang";
import Checkout from "./Kariawan/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminPage/>,
    children: [
      {
        path: "",
        element: <HomeAdmin/>,
      },
      {
        path: "addKaryawan",
        element: <AddKaryawan/>
      },
      {
        path: "manageKaryawan",
        element: <ManageKaryawan/>
      },
      {
        path: "stockGudang",
        element: <StockGudang/>
      },
      {
        path: "returBarang",
        element: <ReturAdmin/>
      },
      {
        path: "listBarang",
        element: <ListBarang/>
      },
      {
        path: "tambahBarang",
        element: <TambahBarang/>,
      },
      {
        path: "penjualanToday",
        element: <PenjualanToday/>
      },
      {
        path: "profileAdmin",
        element: <ProfileAdmin/>
      },
      {
        path: "totalBarangKeluar",
        element: <TotalBarangKeluar2/>
      },
      {
        path: "detailBarang",
        element: <DetailBarang/>
      },
      {
        path: "customer",
        element: <Customer/>
      },
      {
        path: "update_kariawan",
        element: <Update_kariawan/>
      },
      {
        path: "detailkariawan",
        element: <Detailkariawan/>
      },
      {
        path: "chatadmin",
        element: <Chatadmin/>
      }
    ]
  },
  {
    path: "/kepalagudang",
    element: <KepalaGudangPage />,
    children: [
      {
        path: "",
        element: <HomeKepalaGudang/>
      },
      {
        path: "stockGudang",
        element: <StockGudang2/>
      },
      {
        path: "addBarangMasuk",
        element: <TambahBarangMasuk/>
      },
      {
        path: "addBarangKeluar",
        element: <TambahBarangKeluar/>
      },
      {
        path: "returBarang",
        element: <ReturKepalaGudang/>
      },
      {
        path: "totalBarang",
        element: <TotalBarang/>,
      },
      {
        path: "totalBarangKeluar",
        element: <TotalBarangKeluar/>,
      },
      {
        path: "addBarangRetur",
        element: <AddBarangRetur/>
      }
    ]
  },
  {
    path: "/karyawan",
    element: <KaryawanPage/>,
    children: [
      {
        path: "",
        element: <HomeKaryawan/>
      },
      {
        path: "listBarang",
        element: <List_barang_kariawan/>
      },
      {
        path: "keranjang",
        element: <Keranjang/>
      },
      {
        path: "cekStockGudang",
        element: <CekStockGudang/>
      },
      {
        path: "checkOut",
        element: <Checkout/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
