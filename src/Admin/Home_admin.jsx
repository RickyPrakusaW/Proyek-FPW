import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { Pie, Line, Bar } from "react-chartjs-2";
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
  BarElement,
} from "chart.js";

// Registrasi komponen chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
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
  const [monthlySalesData, setMonthlySalesData] = useState({
    labels: [],
    data: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();

  // Dynamic theme classes
  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const cardClasses = isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-gray-900";
  const chartClasses = isDarkMode ? "bg-gray-700" : "bg-blue-200";

  // Fungsi untuk mendapatkan nama bulan dalam bahasa Indonesia
  const getIndonesianMonth = (monthIndex) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return months[monthIndex];
  };

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

        const cityCounts = customers.reduce((acc, customer) => {
          const city = customer.Kota || "Tidak Diketahui";
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {});
        setCustomerDistributionByCity(cityCounts);
      })
      .catch((error) => console.error("Error mengambil data customer:", error));

    // Ambil dan proses data penjualan per bulan
    axios
      .get("http://localhost:3000/api/admin/getPenjualan")
      .then((response) => {
        const penjualanData = response.data.data;

        // Hitung total pemasukan keseluruhan
        const total = penjualanData.reduce((sum, penjualan) => sum + penjualan.totalHarga, 0);
        setTotalIncome(total);

        // Inisialisasi array untuk menyimpan total per bulan (12 bulan)
        const monthlyTotals = Array(12).fill(0);

        // Kelompokkan dan jumlahkan penjualan per bulan
        penjualanData.forEach(penjualan => {
          const date = new Date(penjualan.tanggal);
          const month = date.getMonth(); // 0-11
          monthlyTotals[month] += penjualan.totalHarga;
        });

        // Siapkan data untuk chart
        const monthLabels = Array(12).fill().map((_, index) => getIndonesianMonth(index));
        
        setMonthlySalesData({
          labels: monthLabels,
          data: monthlyTotals,
        });
      })
      .catch((error) => console.error("Error mengambil data penjualan:", error));
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Data untuk pie charts
  const employeePieChartData = {
    labels: Object.keys(employeeDistribution || {}),
    datasets: [
      {
        data: Object.values(employeeDistribution || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  };

  const customerCityPieChartData = {
    labels: Object.keys(customerDistributionByCity || {}),
    datasets: [
      {
        data: Object.values(customerDistributionByCity || {}),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  };

  // Konfigurasi untuk bar chart penjualan bulanan
  const monthlySalesChartData = {
    labels: monthlySalesData.labels,
    datasets: [
      {
        label: "Total Penjualan per Bulan",
        data: monthlySalesData.data,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF99CC', '#66B2FF', '#FFE5CC', '#99E6E6', '#CC99FF', '#FFB366'
        ],
        borderColor: isDarkMode ? 
          Array(12).fill('rgba(255, 255, 255, 0.2)') : 
          Array(12).fill('rgba(0, 0, 0, 0.2)'),
        borderWidth: 1,
      },
    ],
  };

  const monthlySalesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Total Penjualan per Bulan",
        color: isDarkMode ? "#ffffff" : "#000000",
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Total: Rp ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000",
          callback: (value) => `Rp ${value.toLocaleString()}`
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }
      },
      x: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000"
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }
      }
    }
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-5 space-y-5">
        {/* Header */}
        <header className="text-center py-5">
          <h1 className="text-3xl font-bold">Selamat Datang Admin</h1>
        </header>

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
          
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Admin/TotalBarangKeluar")}
          >
            <h3 className="text-xl font-semibold">Barang Keluar Gudang</h3>
          </div>
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Admin/ReturGudang")}
          >
            <h3 className="text-xl font-semibold">Retur Gudang</h3>
          </div>
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => navigate("/Admin/PrintNota")}
          >
            <h3 className="text-xl font-semibold">Print Nota</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {/* Tombol Chat Kepala Gudang */}
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => window.open("https://wa.me/6285172182144", "_blank")}
          >
            <h3 className="text-xl font-semibold">Chat Kepala Gudang</h3>
            <p className="text-base font-medium">Klik untuk membuka WhatsApp</p>
          </div>

          {/* Tombol Grup WhatsApp */}
          <div
            className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
            onClick={() => window.open("https://chat.whatsapp.com/HuPk8fAJxvc452QZkOL6Ii", "_blank")}
          >
            <h3 className="text-xl font-semibold">Grup WhatsApp Kariawan</h3>
            <p className="text-base font-medium">Klik untuk masuk ke grup</p>
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

          {/* Bar Chart Penjualan Bulanan */}
          <div className={`p-5 rounded-md ${chartClasses} col-span-2`}>
            <div className="h-80">
              <Bar data={monthlySalesChartData} options={monthlySalesChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;