import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserMd,
  FaChartLine,
  FaCalendarAlt,
  FaFlag,
  FaBlog,
} from "react-icons/fa";

export const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-indigo-600">MindCare Admin</h2>
      </div>
      <nav className="p-4 space-y-2">
        <Link
          to="/admin-dashboard"
          className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg"
        >
          <FaChartLine className="mr-3" />
          Dashboard
        </Link>
        <Link
          to="/get-users"
          className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <FaUsers className="mr-3" />
          User Management
        </Link>
        <Link
          to="/get-therapists"
          className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <FaUserMd className="mr-3" />
          Therapist Management
        </Link>
        <Link
          to="/get-blogs"
          className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <FaBlog className="mr-3" />
          Blogs
        </Link>
      </nav>
    </div>
  );
};
