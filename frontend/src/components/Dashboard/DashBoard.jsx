import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white text-black dark:bg-black dark:text-white">
      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu size={24} />
        </button>
        
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
