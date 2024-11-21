// import React from "react";
// import logo from "./assets/logo.jpg";
// import { useNavigate } from "react-router-dom"
// const Login = () => {
//   const navigate = useNavigate(); // Inisialisasi useNavigate

//   const handleLogin = (e) => {
//     e.preventDefault(); // Mencegah reload halaman setelah submit
//     // Logika validasi autentikasi bisa ditambahkan di sini
//     navigate("/homeadmin"); // Navigasi ke halaman HomeAdmin
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#3d61cb' }}>
//       <div className="bg-white shadow-lg p-8 flex items-center max-w-3xl" style={{ borderRadius: '30px' }}>
//         <div className="w-1/2 pr-8">
//           <h2 className="text-5xl font-bold text-center mb-4">LOGIN</h2>
//           <form className="flex flex-col">
//             <input
//               type="email"
//               placeholder="Enter User Email"
//               className="p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               style={{ borderRadius: '12px' }}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               style={{ borderRadius: '12px' }}
//             />
//             <button
//               type="submit"
//               className="bg-green-500 text-white py-2 font-semibold hover:bg-green-600"
//               style={{ borderRadius: '12px' }}
//             >
//               Login
//             </button>
//           </form>
//         </div>
//         <div className="w-1/2 pl-8">
//           <img src={logo} alt="Logo Semoga Jadi Jaya" style={{ borderRadius: '30px' }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import logo from "./assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah submit
    // Logika validasi autentikasi bisa ditambahkan di sini
    navigate("/homeadmin"); // Navigasi ke halaman HomeAdmin
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#3d61cb" }}
    >
      <div
        className="bg-white shadow-lg p-8 flex items-center max-w-3xl"
        style={{ borderRadius: "30px" }}
      >
        <div className="w-1/2 pr-8">
          <h2 className="text-5xl font-bold text-center mb-4">LOGIN</h2>
          <form className="flex flex-col" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter User Email"
              className="p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderRadius: "12px" }}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderRadius: "12px" }}
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 font-semibold hover:bg-green-600"
              style={{ borderRadius: "12px" }}
            >
              Login
            </button>
            <br />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 font-semibold hover:bg-green-600"
              style={{ borderRadius: "12px" }}
              onClick={() => navigate("/Homekepalagudang")}
            >
              Login kepala gudang example
            </button>
            <br />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 font-semibold hover:bg-green-600"
              style={{ borderRadius: "12px" }}
              onClick={() => navigate("/Profile")}
            >
              Login kariawan example
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-8">
          <img
            src={logo}
            alt="Logo Semoga Jadi Jaya"
            style={{ borderRadius: "30px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
