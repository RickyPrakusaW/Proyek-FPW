import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

function Profile() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-gray-900 border-gray-300";
  const labelClasses = isDarkMode ? "text-gray-400" : "text-gray-600"; // Untuk label
  const valueClasses = isDarkMode ? "text-white" : "text-gray-900"; // Untuk value

  return (
    <div className={`flex h-screen ${themeClasses}`}>
      {/* Main Content */}
      <div className={`w-3/4 p-6 ${cardClasses}`}>
        {/* Header */}
        <div className={`${cardClasses} rounded-lg shadow p-4 mb-6 flex items-center`}>
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tiok Richie</h1>
            <p className={labelClasses}>000000</p>
          </div>
        </div>

        {/* Biodata Section */}
        <div className={`${cardClasses} rounded-lg shadow p-6`}>
          <h2 className="text-lg font-bold text-blue-600 mb-4">Biodata</h2>
          <div className="grid grid-cols-2 gap-y-4">
            {[
              { label: "Alamat", value: "Example" },
              { label: "Email", value: "Example" },
              { label: "Telephone", value: "Example" },
              { label: "Tanggal Lahir", value: "Example" },
              { label: "Tempat Lahir", value: "Example" },
              { label: "Agama", value: "Example" },
              { label: "Jenis Kelamin", value: "Example" },
              { label: "Golongan Darah", value: "Example" },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <p className={labelClasses}>{item.label}</p>
                <p className={valueClasses}>{item.value}</p>
              </React.Fragment>
            ))}
            <p className={labelClasses}>Password</p>
            <input
              type="password"
              className={`border rounded-lg px-3 py-1 w-full ${inputClasses}`}
            />
          </div>
          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;