import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { Pie, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const HomeAdmin = () => {
  const { isDarkMode } = useTheme();

  // State management
  const [totalProducts, setTotalProducts] = useState(0);
  const [productTypes, setProductTypes] = useState({});
  const [employeeDistribution, setEmployeeDistribution] = useState({});
  const [customerDistributionByCity, setCustomerDistributionByCity] = useState({});
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [dailySalesData, setDailySalesData] = useState({ dates: [], totals: [] });

  const navigate = useNavigate();

  // Dynamic theme classes
  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const cardClasses = isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-gray-900";
  const chartClasses = isDarkMode ? "bg-gray-700" : "bg-blue-200";

  useEffect(() => {
    // Ambil data produk
    axios
      .get("http://localhost:3000/api/admin/products")
      .then((response) => {
        const products = response.data.data;
        setTotalProducts(products.length);

        const typeCounts = products.reduce((acc, product) => {
          acc[product.type] = (acc[product.type] || 0) + 1;
          return acc;
        }, {});
        setProductTypes(typeCounts);
      })
      .catch((error) => console.error("Error mengambil data produk:", error));

    // Ambil data karyawan
    axios
      .get("http://localhost:3000/api/admin/getKaryawan")
      .then((response) => {
        const employees = response.data.data;
        setTotalEmployees(employees.length);

        const distribution = employees.reduce((acc, employee) => {
          const category = employee.position || "Unspecified";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setEmployeeDistribution(distribution);
      })
      .catch((error) => console.error("Error mengambil data karyawan:", error));

    // Ambil data customer
    axios
      .get("http://localhost:3000/api/admin/getCustomers")
      .then((response) => {
        const customers = response.data.data;
        setTotalCustomers(customers.length);

        // Hitung distribusi customer berdasarkan kota
        const cityCounts = customers.reduce((acc, customer) => {
          const city = customer.Kota || "Tidak Diketahui";
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {});
        setCustomerDistributionByCity(cityCounts);
      })
      .catch((error) => console.error("Error mengambil data customer:", error));

    // Ambil data penjualan untuk menghitung total pemasukan
    axios
      .get("http://localhost:3000/api/admin/getPenjualan")
      .then((response) => {
        const penjualanData = response.data.data;

        // Hitung total pemasukan
        const total = penjualanData.reduce((sum, penjualan) => sum + penjualan.totalHarga, 0);
        setTotalIncome(total);

        // Siapkan data untuk grafik penjualan harian
        const groupedByDate = penjualanData.reduce((acc, penjualan) => {
          const date = penjualan.tanggal.split("T")[0];
          acc[date] = (acc[date] || 0) + penjualan.totalHarga;
          return acc;
        }, {});

        const dates = Object.keys(groupedByDate).sort();
        const totals = dates.map((date) => groupedByDate[date]);

        setDailySalesData({ dates, totals });
      })
      .catch((error) => console.error("Error mengambil data penjualan:", error));
  }, []);

  // Data untuk chart
  const employeePieChartData = {
    labels: Object.keys(employeeDistribution),
    datasets: [
      {
        data: Object.values(employeeDistribution),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  };

  const customerCityPieChartData = {
    labels: Object.keys(customerDistributionByCity),
    datasets: [
      {
        data: Object.values(customerDistributionByCity),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  };

  const dailySalesChartData = {
    labels: dailySalesData.dates,
    datasets: [
      {
        label: "Penjualan Harian",
        data: dailySalesData.totals,
        fill: false,
        backgroundColor: "#4BC0C0",
        borderColor: "#36A2EB",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-5 space-y-5">
        {/* Kartu Atas */}
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/admin/penjualanToday")}
          >
            <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
            <p className="text-2xl font-bold">Rp. {totalIncome.toLocaleString()}</p>
          </div>

          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Admin/Customer")}
          >
            <h3 className="text-xl font-semibold">Customer</h3>
            <p className="text-2xl font-bold">{totalCustomers} Customer</p>
          </div>
          <div className={`${cardClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">{totalProducts} Barang</p>
          </div>
        </div>

        {/* Bagian Chart */}
        <div className="grid grid-cols-2 gap-5">
          {/* Distribusi Karyawan */}
          <div className={`p-5 rounded-md ${chartClasses}`}>
            <h3 className="text-xl font-semibold mb-3">Distribusi Karyawan</h3>
            <div className="w-56 h-56 mx-auto">
              <Pie data={employeePieChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Customer Berdasarkan Kota */}
          <div className={`p-5 rounded-md ${chartClasses}`}>
            <h3 className="text-xl font-semibold mb-3">Customer Berdasarkan Kota</h3>
            <div className="w-56 h-56 mx-auto">
              <Pie data={customerCityPieChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Grafik Penjualan Harian */}
        <div className={`p-5 rounded-md ${chartClasses}`}>
          <h3 className="text-xl font-semibold mb-3">Grafik Penjualan Harian</h3>
          <div className="w-full h-64">
            <Line data={dailySalesChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
