import React, { useState } from "react";
import { MdDashboard, MdPayments } from "react-icons/md";
import { CiUser, CiViewBoard } from "react-icons/ci";
import { FaCookie } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
// import logo from "@/assets/unnamed.png";
// import ConfirmModal from "../confirmmodel/confirmmodel";
// import { useAdminLogout } from "@/modules/admin/dashboard/api/logout";
import { toast } from "react-toastify";
export const Sidebar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { to: "/user-dashboard", icon: <MdDashboard />, text: "Dashboard" },
    {to:"/journel", icon: <CiUser />, text: "Journel" },
    { to: "/therapists", icon: <CiUser />, text: "Therapists " },
    { to: "/mood-tracking", icon: <FaCookie />, text: "Mood Tracking " },
    {to:"/blogs",icon:<CiViewBoard/>, text: "Blogs" },
    { to: "/activities", icon: <MdPayments />, text: "Wellness Activities " },
    { to: "/help", icon: <TbReportSearch />, text: "Help & Supports" },
  ];
//   const { mutateAsync: logout, isLoading } = useAdminLogout();
  const handleLogout = async () => {  
    // try {
        toast.success("Logout")
//       await logout();
//       localStorage.removeItem("adminToken"); 
//       toast.success("logout sucessfull")
//       window.location.href = "/admin/login"; // Redirect
//     } catch (error) {
//       console.log("logout fsiled",error)
//       toast.error("Logout failed", error);
    };
//   };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={handleToggleSidebar}
        className="md:hidden fixed top-7 left-2 bg-green-600 text-white p-2 rounded-full shadow-lg z-50 transition-all hover:bg-green-700"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-300 transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:relative md:flex flex-col border-l border-gray-200`}
      >
        {/* Header */}
        <Link to="/user-dashboard" className="flex items-center p-6">
          {/* <div className="h-5 w-10 flex items-center justify-center">
            <img src={logo} alt="Logo" />
          </div> */}
          <span className="text-3xl font-bold text-green-600">MindCare </span>
        </Link>

        {/* Navigation */}
        <nav className="flex-grow px-4 py-6 space-y-2">
          {menuItems.map(({ to, icon, text }) => (
            <SidebarLink
              key={to}
              to={to}
              icon={icon}
              text={text}
              active={location.pathname.startsWith(to)}
              onClick={handleToggleSidebar}
            />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-200">
          <button
        //   disabled={isLoading}
            onClick={() => setShowLogoutModal(true)}
            className="flex  cursor-pointer items-center gap-3 w-full px-4 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-600 transition rounded-lg group"
          >
            <FiLogOut className="text-lg group-hover:animate-pulse" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Confirm Logout Modal */}
      {/* {showLogoutModal && (
        <ConfirmModal
          title="Logout Confirmation"
          message="Are you sure you want to log out?"
          confirmLabel="Logout"
          cancelLabel="Cancel"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          confirmColor="bg-red-600 hover:bg-red-700"
        />
      )} */}
    </>
  );
};

const SidebarLink = ({ to, icon, text, active = false, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
        active
          ? "bg-green-50 text-green-600 shadow-sm"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span
        className={`text-lg transition-colors ${
          active ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"
        }`}
      >
        {icon}
      </span>
      <span className="text-sm font-medium">{text}</span>
      {active && (
        <span className="ml-auto h-2 w-2 bg-green-600 rounded-full"></span>
      )}
    </Link>
  );
};