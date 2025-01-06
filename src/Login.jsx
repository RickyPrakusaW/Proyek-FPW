import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from "./assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (data) => {
    const { username, password } = data;
    setIsLoading(true);
    setErrorMessage("");

    // Hard-coded validation for Admin and Kepala Gudang
    if (username === "admin" && password === "admin") {
      navigate("/admin");
      setIsLoading(false);
      return;
    } else if (username === "thio" && password === "thio") {
      navigate("/kepalagudang");
      setIsLoading(false);
      return;
    }

    // Database validation for Karyawan
    try {
      const response = await axios.post("http://localhost:3000/api/admin/login", {
        email: username.toLowerCase(), // Normalize email
        password,
      });

      if (response.data.role === "karyawan") {
        navigate("/karyawan");
      } else if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        setErrorMessage("Role not recognized");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid username or password");
    } finally {
      setIsLoading(false);
    }
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
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Enter Username"
              className="p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderRadius: "12px" }}
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderRadius: "12px" }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-green-500 text-white py-2 font-semibold hover:bg-green-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ borderRadius: "12px" }}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-8">
          <img
            src={logo}
            alt="Logo"
            style={{ borderRadius: "30px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
