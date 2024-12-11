import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const HomeAdmin = () => {
  const { isDarkMode } = useTheme();
  const [totalProducts, setTotalProducts] = useState(0);
  const [productTypes, setProductTypes] = useState({});
  const [employeeDistribution, setEmployeeDistribution] = useState({});
  const [totalEmployees, setTotalEmployees] = useState(0);
  const navigate = useNavigate();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-blue-400 text-gray-900";
  const chartClasses = isDarkMode
    ? "bg-gray-700"
    : "bg-blue-200";

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Penjualan Bulanan (Rp)",
        data: [
          1000000, 2000000, 1500000, 3000000, 2500000, 4000000, 3500000, 2000000,
          3000000, 4500000, 5000000, 4000000,
        ],
        backgroundColor: isDarkMode
          ? "rgba(54, 162, 235, 0.8)"
          : "rgba(75, 192, 192, 0.8)",
        borderColor: isDarkMode
          ? "rgba(54, 162, 235, 1)"
          : "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "white" : "black",
        },
      },
      title: {
        display: true,
        text: "Grafik Penjualan Bulanan",
        color: isDarkMode ? "white" : "black",
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "white" : "black",
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "white" : "black",
        },
      },
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/getProduct")
      .then((response) => {
        const products = response.data.data;
        setTotalProducts(products.length);

        const typeCounts = products.reduce((acc, product) => {
          acc[product.type] = (acc[product.type] || 0) + 1;
          return acc;
        }, {});
        setProductTypes(typeCounts);
      })
      .catch((error) => {
        console.error("Error saat mengambil data produk:", error);
      });

    axios
      .get("http://localhost:3000/api/admin/getKaryawan")
      .then((response) => {
        const employees = response.data.data;
        setTotalEmployees(employees.length);

        const distribution = employees.reduce((acc, employee) => {
          const category = employee.position || "Unspecified"; // Ganti sesuai field di model Anda
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setEmployeeDistribution(distribution);
      })
      .catch((error) => {
        console.error("Error saat mengambil data karyawan:", error);
      });
  }, []);

  const pieChartData = {
    labels: Object.keys(productTypes),
    datasets: [
      {
        data: Object.values(productTypes),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const employeePieChartData = {
    labels: Object.keys(employeeDistribution),
    datasets: [
      {
        data: Object.values(employeeDistribution),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-5 space-y-5">
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/admin/penjualanToday")}
          >
            <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
            <p className="text-2xl font-bold">Rp. 1.000.000</p>
          </div>
          <div
            className={`${cardClasses} p-5 rounded-md text-center`}
            onClick={() => navigate("/admin/totalBarangKeluar")}
          >
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div className={`${cardClasses} p-5 rounded-md text-center`}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">{totalProducts} Barang</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className={`p-5 rounded-md ${chartClasses}`}>
            <h3 className="text-xl font-semibold mb-3">Penjualan Bulanan</h3>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className={`p-5 rounded-md ${chartClasses}`}>
            <h3 className="text-xl font-semibold mb-3">Distribusi Tipe Barang</h3>
            <div className="w-72 h-72 mx-auto">
              <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="mt-3 space-y-2">
              {Object.keys(productTypes).map((type) => (
                <p key={type} className="text-sm">
                  <span className="font-bold">{type}:</span>{" "}
                  {((productTypes[type] / totalProducts) * 100).toFixed(2)}%
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-md ${chartClasses}`}>
          <h3 className="text-xl font-semibold mb-3">Distribusi Karyawan</h3>
          <div className="w-72 h-72 mx-auto">
            <Pie data={employeePieChartData} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="mt-3 space-y-2">
            {Object.keys(employeeDistribution).map((category) => (
              <p key={category} className="text-sm">
                <span className="font-bold">{category}:</span>{" "}
                {((employeeDistribution[category] / totalEmployees) * 100).toFixed(2)}%
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
