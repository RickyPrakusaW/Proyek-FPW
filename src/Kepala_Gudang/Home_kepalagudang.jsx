import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
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
import { useTheme } from "./../ThemeContext";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Homekepalagudang = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [barangData, setBarangData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getStock");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch data");
        }

        setBarangData(result.data); // Set stock data
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  // Prepare Bar Chart data
  const barChartData = {
    labels: barangData.map((barang) => barang.nama), // Get the product names
    datasets: [
      {
        label: "Total Barang Masuk",
        data: barangData.map((barang) => barang.total_barang), // Get the stock quantity
        backgroundColor: "#4CAF50", // Set the color of the bars
      },
    ],
  };

  // Prepare Pie Chart data
  const pieChartData = {
    labels: barangData.map((barang) => barang.nama),
    datasets: [
      {
        label: "Total Barang",
        data: barangData.map((barang) => barang.total_barang),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Diagram Total Barang Masuk",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} Karung`;
          },
        },
      },
    },
  };

  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const cardClasses = isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 p-5 space-y-5">
          {isLoading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-5">
                <div
                  className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
                  onClick={() => navigate("/kepalaGudang/totalBarang")}
                >
                  <h3 className="text-xl font-semibold">Total Barang Masuk</h3>
                  <p className="text-2xl font-bold">{barangData.length} Item</p>
                </div>

                <div
                  className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
                  onClick={() => navigate("/kepalaGudang/totalBarangKeluar")}
                >
                  <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
                  <p className="text-2xl font-bold">1000 Karung</p>
                </div>

                <div className={`${cardClasses} p-5 rounded-md text-center`}>
                  <h3 className="text-xl font-semibold">Total Barang</h3>
                  <p className="text-2xl font-bold">
                    {barangData.reduce((total, barang) => total + (barang.total_barang || 0), 0)} Barang
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Bar Chart */}
                <div className={`p-5 rounded-md ${themeClasses}`}>
                  <h3 className="text-xl font-semibold mb-3">Diagram Total Barang Masuk</h3>
                  <div className="w-full h-80">
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </div>

                {/* Pie Chart */}
                <div className={`p-5 rounded-md ${themeClasses}`}>
                  <h3 className="text-xl font-semibold mb-3">Distribusi Total Barang</h3>
                  <div className="w-full h-80">
                    <Pie data={pieChartData} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homekepalagudang;
