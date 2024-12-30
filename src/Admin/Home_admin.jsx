import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen chart.js
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const HomeAdmin = () => {
  const { isDarkMode } = useTheme();

  // State management
  const [totalProducts, setTotalProducts] = useState(0);
  const [productTypes, setProductTypes] = useState({});
  const [employeeDistribution, setEmployeeDistribution] = useState({});
  const [customerDistributionByCity, setCustomerDistributionByCity] = useState({});
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

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
  }, []);

  // Fungsi untuk membuka chat WhatsApp dengan pesan otomatis
  const openWhatsAppChat = () => {
    const phoneNumber = "6285100059521"; // Nomor WhatsApp tanpa tanda + (untuk Indonesia gunakan 62)
    const message = "Halo, saya ingin bertanya tentang produk Anda!"; // Pesan yang akan dikirim
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Buka URL WhatsApp di jendela baru
    window.open(
      url,
      "WhatsAppChat",
      "width=600,height=700,top=100,left=100,scrollbars=no,resizable=no"
    );
  };

  // Fungsi untuk membuka grup WhatsApp
  const openWhatsAppGroup = () => {
    const groupInviteLink = "https://chat.whatsapp.com/HuPk8fAJxvc452QZkOL6Ii"; // Ganti dengan link grup WhatsApp Anda
    window.open(
      groupInviteLink,
      "WhatsAppGroup",
      "width=600,height=700,top=100,left=100,scrollbars=no,resizable=no"
    );
  };

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
            <p className="text-2xl font-bold">Rp. 1.000.000</p>
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

        {/* Tombol Chat WhatsApp */}
        <div className="flex space-x-4">
          <button
            onClick={openWhatsAppChat}
            className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          >
            Chat Kepala Gudang
          </button>
          <button
            onClick={openWhatsAppGroup}
            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Masuk Grup Kelompok SDP 2024
          </button>
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
      </div>
    </div>
  );
};

export default HomeAdmin;
