import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";

const Sidebar = () => (
  <div className="w-1/4 bg-white p-5 min-h-screen">
    <div className="flex items-center mb-10">
      <img
        src="https://via.placeholder.com/50"
        alt="Admin Profile"
        className="rounded-full mr-3"
      />
      <h2 className="text-xl font-bold text-blue-500">Admin</h2>
    </div>
    <ul className="space-y-4">
      <li className="bg-blue-200 p-2 rounded-lg text-blue-500 font-semibold">Dashboard</li>
      <li>Manage Karyawan</li>
      <li>Stock Gudang</li>
      <li>Retur Barang</li>
      <li>List Barang</li>
    </ul>
    <button className="mt-10 bg-pink-500 text-white p-2 rounded-lg">LogOut</button>
  </div>
);

const DashboardContent = () => {
  const barData = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DES"],
    datasets: [
      {
        label: "Penjualan Bulanan",
        backgroundColor: "#3b82f6",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
    ],
  };

  const doughnutData = {
    labels: ["Tipe 1", "Tipe 2", "Tipe 3", "Tipe 4", "Tipe 5"],
    datasets: [
      {
        data: [20, 20, 20, 20, 20],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa"],
      },
    ],
  };

  return (
    <div className="w-3/4 bg-blue-100 p-5">
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3>Penjualan Hari Ini</h3>
          <p className="text-2xl font-bold">Rp. 1.000.000</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3>Total Barang Keluar</h3>
          <p className="text-2xl font-bold">1000</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3>Total Barang</h3>
          <p className="text-2xl font-bold">0 Barang</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h3 className="text-center mb-5 font-bold">Penjualan Bulanan</h3>
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <h3 className="text-center mb-5 font-bold">Stock Tipe Barang</h3>
        <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
