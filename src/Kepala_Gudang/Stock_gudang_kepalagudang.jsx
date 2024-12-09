import React from "react";
import { useTheme } from "./../ThemeContext";

const Stockgudang = () => {
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const tableHeaderClasses = isDarkMode
    ? "bg-blue-600 text-white"
    : "bg-blue-300 text-black";
  const rowOddClasses = isDarkMode ? "bg-gray-700" : "bg-gray-200";
  const rowEvenClasses = isDarkMode ? "bg-gray-800" : "bg-gray-300";
  const inputClasses = isDarkMode
    ? "p-2 rounded-md border border-gray-700 text-black focus:outline-none"
    : "p-2 rounded-md border border-gray-300 text-black focus:outline-none";

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Main Content */}
      <div className="flex-1 p-5 rounded-md">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Stock Di Gudang</h1>
          <input
            type="text"
            placeholder="Search"
            className={inputClasses}
          />
        </div>

        {/* Tabel */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={tableHeaderClasses}>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Tanggal Masuk</th>
              <th className="p-3 border">Tanggal Keluar</th>
              <th className="p-3 border">Tipe Barang</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? rowEvenClasses : rowOddClasses
                } hover:bg-blue-700`}
              >
                <td className="p-3 border">00{index + 1}</td>
                <td className="p-3 border">Example</td>
                <td className="p-3 border">0</td>
                <td className="p-3 border">11 November 2024</td>
                <td className="p-3 border">11 November 2024</td>
                <td className="p-3 border">
                  {index % 3 === 0
                    ? "Tas Sekolah"
                    : index % 3 === 1
                    ? "Tas Anak"
                    : "Tas Canvas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stockgudang;
