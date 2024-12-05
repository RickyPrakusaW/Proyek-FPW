import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import SideBar from "./component/SideBar"

const HomeAdmin = () => {
  
  
  const { isDarkMode } = useTheme();
  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-blue-400 text-gray-900";
  const chartClasses = isDarkMode
    ? "bg-gray-700"
    : "bg-blue-200";

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <SideBar />
      <div className="flex-1 p-5 space-y-5">
        <div className="grid grid-cols-3 gap-5">
          <div className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}>
            <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000</p>
          </div>
          <div className={`${cardClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div className={`${cardClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">0 Barang</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className={`p-5 rounded-md ${chartClasses}`}>
            <h3 className="text-xl font-semibold mb-3">Penjualan Bulanan</h3>
            <div className={`relative w-full h-48 rounded-md ${chartClasses}`}></div>
          </div>
          <div className={`p-5 rounded-md ${chartClasses}`}>
            <h3 className="text-xl font-semibold mb-3">Stock Tipe Barang</h3>
            <div className={`relative w-full h-48 rounded-md ${chartClasses}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
