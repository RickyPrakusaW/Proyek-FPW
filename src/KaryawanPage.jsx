import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from './Kariawan/component/SideBar';
import { useTheme } from './ThemeContext';

const KaryawanPage = () => {
  const { isDarkMode } = useTheme();
  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  return (
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Sidebar */}
      <SideBar />
      
      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default KaryawanPage;
