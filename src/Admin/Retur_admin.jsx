import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";

const ReturAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [barangReturs, setBarangReturs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);  // State for showing the modal
  const [newRetur, setNewRetur] = useState({
    Id_barang: '',
    Nama_barang: '',
    Jumlah_barang: '',
    Tanggal: '',
    Photo_product: null,
  });

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const tableHeaderClasses = isDarkMode
    ? "bg-blue-600 text-white"
    : "bg-blue-300 text-gray-900";
  const tableRowClasses = isDarkMode
    ? "bg-gray-700 hover:bg-blue-700"
    : "bg-gray-100 hover:bg-blue-100";

  // Fetch the return data
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/getRetur")
      .then((response) => {
        setBarangReturs(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the return data!", error);
      });
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRetur({
      ...newRetur,
      [name]: value,
    });
  };

  // Handle file input for the image
  const handleFileChange = (e) => {
    setNewRetur({
      ...newRetur,
      Photo_product: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id_barang", newRetur.Id_barang);
    formData.append("Nama_barang", newRetur.Nama_barang);
    formData.append("Jumlah_barang", newRetur.Jumlah_barang);
    formData.append("Tanggal", newRetur.Tanggal);
    formData.append("Photo_product", newRetur.Photo_product);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/addRetur",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
      setShowModal(false);  // Close the modal
      setNewRetur({
        Id_barang: '',
        Nama_barang: '',
        Jumlah_barang: '',
        Tanggal: '',
        Photo_product: null,
      }); // Clear the form
    } catch (error) {
      console.error("Error adding return:", error);
      alert("Failed to add return!");
    }
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Retur Barang</h1>
          <input
            type="text"
            placeholder="Cari"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-2 rounded-md border ${
              isDarkMode ? "border-gray-500 text-black" : "border-gray-700"
            } focus:outline-none`}
          />
          {/* Add Retur Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 px-5 py-2 rounded-md text-white font-semibold hover:bg-green-600"
          >
            + Tambah Retur
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className={`${tableHeaderClasses}`}>
              <th className="p-3 border">No</th>
              <th className="p-3 border">ID Barang</th>
              <th className="p-3 border">Nama Barang</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Foto Barang</th>
            </tr>
          </thead>
          <tbody>
            {barangReturs.length > 0 ? (
              barangReturs
                .filter((barang) =>
                  barang.Nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((barang, index) => (
                  <tr key={barang._id} className={`${tableRowClasses}`}>
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{barang.Id_barang}</td>
                    <td className="p-3 border">{barang.Nama_barang}</td>
                    <td className="p-3 border">{barang.Jumlah_barang}</td>
                    <td className="p-3 border">
                      <div className="flex justify-center">
                        <img
                          src={
                            barang.Photo_product
                              ? `http://localhost:3000/uploads/${barang.Photo_product}`
                              : "https://via.placeholder.com/40"
                          }
                          alt={barang.Nama_barang}
                          className="w-10 h-10"
                        />
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  Tidak ada data retur barang.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal for adding return */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h3 className="text-2xl font-bold mb-4">Tambah Retur</h3>
              <form onSubmit={handleSubmit}>
                {/* ID Retur Admin is automatically generated */}
                {/* <div className="mb-4">
                  <label className="block text-gray-700">ID Retur Admin</label>
                  <input
                    type="text"
                    name="Id_retur_admin"
                    value={newRetur.Id_retur_admin}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md"
                    disabled
                  />
                </div> */}
                <div className="mb-4">
                  <label className="block text-gray-700">ID Barang</label>
                  <input
                    type="text"
                    name="Id_barang"
                    value={newRetur.Id_barang}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Nama Barang</label>
                  <input
                    type="text"
                    name="Nama_barang"
                    value={newRetur.Nama_barang}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Jumlah Barang</label>
                  <input
                    type="number"
                    name="Jumlah_barang"
                    value={newRetur.Jumlah_barang}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Tanggal</label>
                  <input
                    type="date"
                    name="Tanggal"
                    value={newRetur.Tanggal}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Foto Barang</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mr-2 bg-gray-400 px-4 py-2 rounded-md text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 px-4 py-2 rounded-md text-white"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturAdmin;
