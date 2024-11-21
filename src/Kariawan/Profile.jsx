import React from "react";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-5 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Name */}
        <h2 className="text-xl font-bold text-blue-600">Tiok</h2>
        {/* Menu */}
        <div className="mt-8 space-y-4 w-full">
          <button className="w-full text-left text-gray-600 hover:text-blue-600" onClick={() => navigate("/Listbarangkariawan")}>
            List Barang
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600">
            Keranjang
          </button>
          <button className="w-full text-left text-gray-600 hover:text-blue-600">
            Cek Stok Gudang
          </button>
        </div>
        {/* Logout Button */}
        <button className="mt-auto px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600">
          Keluar
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-blue-50">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tiok Richie</h1>
            <p className="text-gray-500">000000</p>
          </div>
        </div>

        {/* Biodata Section */}
        <div className="bg-white rounded-lg shadow p-6">
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
                <p className="text-gray-600">{item.label}</p>
                <p className="text-gray-900 font-medium">{item.value}</p>
              </React.Fragment>
            ))}
            <p className="text-gray-600">Password</p>
            <input
              type="password"
              className="border rounded-lg px-3 py-1 w-full"
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
