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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Homekepalagudang = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [barangData, setBarangData] = useState([]);
  const [barangKeluarData, setBarangKeluarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stock data and barang keluar data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [stockResponse, barangKeluarResponse] = await Promise.all([
          fetch("http://localhost:3000/api/admin/getStock"),
          fetch("http://localhost:3000/api/admin/barangKeluar"),
        ]);

        const stockResult = await stockResponse.json();
        const barangKeluarResult = await barangKeluarResponse.json();

        if (!stockResponse.ok) {
          throw new Error(stockResult.error || "Failed to fetch stock data");
        }

        if (!barangKeluarResponse.ok) {
          throw new Error(
            barangKeluarResult.error || "Failed to fetch barang keluar data"
          );
        }

        setBarangData(stockResult.data); // Set stock data
        setBarangKeluarData(barangKeluarResult.data); // Set barang keluar data
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  // Calculate total barang keluar
  const totalBarangKeluar = barangKeluarData.reduce(
    (total, barang) => total + (barang.Total_barang || 0),
    0
  );

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-blue-400 text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      <div className="flex flex-1">
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
                  <p className="text-2xl font-bold">{totalBarangKeluar} Karung</p>
                </div>

                <div className={`${cardClasses} p-5 rounded-md text-center`}>
                  <h3 className="text-xl font-semibold">Total Barang</h3>
                  <p className="text-2xl font-bold">
                    {barangData.reduce(
                      (total, barang) => total + (barang.total_barang || 0),
                      0
                    )}{" "}
                    Karung
                  </p>
                </div>
              </div>

              {/* Tombol Chat Kepala Gudang */}
              <div
                className={`${cardClasses} p-5 rounded-md text-center cursor-pointer`}
                onClick={() =>
                  window.open("https://wa.me/6281332075758", "_blank")
                }
              >
                <h3 className="text-xl font-semibold">Chat Admin</h3>
                <p className="text-base font-medium">
                  Klik untuk membuka WhatsApp
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className={`p-5 rounded-md ${themeClasses}`}>
                  <h3 className="text-xl font-semibold mb-3">
                    Diagram Total Barang Berdasarkan Tanggal
                  </h3>
                  <div className="w-full h-80">
                    <Bar data={barChartData} />
                  </div>
                </div>

                <div className={`p-5 rounded-md ${themeClasses}`}>
                  <h3 className="text-xl font-semibold mb-3">
                    Distribusi Total Barang
                  </h3>
                  <div className="w-full h-80">
                    <Pie data={pieChartData} />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-md w-full">
                <h3 className="text-xl font-semibold mb-3">
                  Distribusi Barang Berdasarkan Tipe
                </h3>
                <div className="w-full h-80">
                  <Pie data={pieChartTypeData} />
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
