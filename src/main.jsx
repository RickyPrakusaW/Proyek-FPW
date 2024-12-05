import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Login"
import HomeAdmin from "./Admin/Home_admin"
import HomeKepalaGudang from "./Kepala_Gudang/Home_kepalagudang";
import HomeKaryawan from "./Kariawan/Profile"
import AddKaryawan from "./Admin/Tambah_kariawan"
import { ThemeProvider } from "./ThemeContext"; // Import ThemeProvider
import "./index.css"; // Untuk memuat Tailwind CSS

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin",
    element: <HomeAdmin />
  },
  {
    path: "/kepalagudang",
    element: <HomeKepalaGudang />
  },
  {
    path: "/karyawan",
    element: <HomeKaryawan/>
  },
  {
    path: "/addKaryawan",
    element: <AddKaryawan/>
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
