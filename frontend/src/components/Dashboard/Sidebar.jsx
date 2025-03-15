import React from "react";
import { FiX, FiHome, FiUser, FiTag, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { removeCookie } from "../../axiosConfig/cookieFunc";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("accessToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 border-2 border-r border-gray-300 dark:border-gray-700 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white text-black dark:bg-black dark:text-white transition-transform transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-72 z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6">
          <SidebarLink to="/dashboard" icon={<FiHome />} label="Coupon List" />
          <SidebarLink to="/dashboard/add-coupon" icon={<FiUser />} label="Add Coupon" />
          <SidebarLink to="/dashboard/set-availability" icon={<FiTag />} label="Set Availability" />
          <SidebarLink to="/dashboard/history" icon={<FiTag />} label="Watch History" />
          <div
            onClick={handleLogout}
            className="flex items-center px-6 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            <FiLogOut /> <span className="ml-3">Logout</span>
          </div>
        </nav>
      </div>
    </>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
  >
    {icon} <span className="ml-3">{label}</span>
  </Link>
);

export default Sidebar;
