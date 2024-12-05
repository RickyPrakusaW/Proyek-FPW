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
import ManageKaryawan from "./Admin/Manage_kariawan"
import StockGudang from "./Admin/Stock_gudang"
import ReturAdmin from "./Admin/Retur_admin"
import ListBarang from "./Admin/List_barang_admin"
import { ThemeProvider } from "./ThemeContext"; // Import ThemeProvider
import "./index.css"; // Untuk memuat Tailwind CSS

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "",
        element: <HomeAdmin />,
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
      }
    ]
  },
  {
    path: "/kepalagudang",
    element: <HomeKepalaGudang />
  },
  {
    path: "/karyawan",
    element: <HomeKaryawan/>
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
