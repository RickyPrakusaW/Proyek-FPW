import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../src/context/AuthContext';
import GoogleIcon from './assets/google_icon.png';


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    if (location.state?.error) {
      setErrorMessage(location.state.error);
    }
  }, [location]);

  const handleLoginGoogle = async () => {
    try {
      const googleLogin = await fetch('http://localhost:3000/api/auth/google/request', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await googleLogin.json();
      window.location.href = data.url;
    } catch (error) {
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  const handleLogin = async (formData) => {
    const { username, password } = formData;
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/admin/login", {
        email: username.toLowerCase(),
        password,
      });

      if (response.data && response.status === 200) {
        const userData = {
          ...response.data,
          token: response.data.token || response.data.accessToken,
        };
        
        login(userData);

        switch (userData.role.toLowerCase()) {
          case "admin":
            navigate("/admin");
            break;
          case "kepala_gudang":
            navigate("/kepalagudang");
            break;
          case "karyawan":
            navigate("/karyawan");
            break;
          default:
            setErrorMessage("Invalid role assigned to user");
            logout();
            break;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3d61cb]">
      <div className="bg-white shadow-lg p-8 flex items-center max-w-3xl rounded-[30px]">
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
              className="p-2 mb-4 border rounded-xl"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="p-2 mb-4 border rounded-xl"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-green-500 text-white py-2 rounded-xl ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleLoginGoogle}
              className="mt-4 w-full p-3 bg-[#DB4437] text-white rounded-lg font-bold
                hover:bg-[#80251d] transition-colors duration-300 flex items-center justify-center"
            >
              <img
                src={GoogleIcon}
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
          </form>
        </div>
        <div className="w-1/2 pl-8">
          <img src="/logo.jpg" alt="Logo" className="rounded-[30px]" />
        </div>
      </div>
    </div>
  );
};

export default Login;