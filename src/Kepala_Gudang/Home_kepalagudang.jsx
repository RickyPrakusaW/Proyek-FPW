import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
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

  // Process data by date for Bar and Pie Charts
  const processDataByDate = () => {
    const groupedData = barangData.reduce((acc, barang) => {
      const date = barang.tanggal_masuk;
      acc[date] = (acc[date] || 0) + barang.total_barang;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return { labels, data };
  };

  // Process data by type for Pie Chart
  const processDataByType = () => {
    const groupedData = barangData.reduce((acc, barang) => {
      const type = barang.tipe_barang;
      acc[type] = (acc[type] || 0) + barang.total_barang;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return { labels, data };
  };

  const { labels, data } = processDataByDate();
  const { labels: typeLabels, data: typeData } = processDataByType();

  // Bar Chart Data
  const barChartData = {
    labels, // Tanggal sebagai label
    datasets: [
      {
        label: "Total Barang Masuk",
        data, // Total_barang per tanggal
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // Pie Chart Data for Date Distribution
  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Distribusi Total Barang",
        data,
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

  // Pie Chart Data for Type Distribution
  const pieChartTypeData = {
    labels: typeLabels,
    datasets: [
      {
        label: "Distribusi Barang Berdasarkan Tipe",
        data: typeData,
        backgroundColor: [
          "#FF9999",
          "#66B2FF",
          "#FFDB4D",
          "#80E1A7",
          "#C79EF4",
          "#FFB266",
        ],
        hoverBackgroundColor: [
          "#FF9999",
          "#66B2FF",
          "#FFDB4D",
          "#80E1A7",
          "#C79EF4",
          "#FFB266",
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
        text: "Diagram Total Barang Berdasarkan Tanggal",
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
                  <h3 className="text-xl font-semibold">Total Barang </h3>
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
                    {barangData.reduce((total, barang) => total + (barang.total_barang || 0), 0)} Karung
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Bar Chart */}
                <div className={`p-5 rounded-md ${themeClasses}`}>
                  <h3 className="text-xl font-semibold mb-3">Diagram Total Barang Berdasarkan Tanggal</h3>
                  <div className="w-full h-80">
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </div>

                {/* Pie Chart for Date Distribution */}
                <div className={`p-5 rounded-md ${themeClasses}`}>
                  <h3 className="text-xl font-semibold mb-3">Distribusi Total Barang</h3>
                  <div className="w-full h-80">
                    <Pie data={pieChartData} />
                  </div>
                </div>
              </div>

              {/* Additional Pie Chart for Type Distribution */}
              <div className="p-5 rounded-md w-full">
                <h3 className="text-xl font-semibold mb-3">Distribusi Barang Berdasarkan Tipe</h3>
                <div className="w-full h-80">
                  <Pie data={pieChartTypeData} />
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="flex justify-center mt-5">
                <a
                  href="https://wa.me/6281234567890?text=Halo,%20saya%20membutuhkan%20informasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-5 py-3 rounded-md font-bold hover:bg-green-600"
                >
                  Chat WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homekepalagudang;
