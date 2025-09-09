"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AvailabilityComponent } from "./availability";
import { AppointmentsSection } from "./appointments";

export const TherapistDashboard = () => {
  const { user, logout } = useAuth(); // ✅ make sure logout is exposed from AuthContext
  const [activeTab, setActiveTab] = useState("overview");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.doctorInfo?.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Settings Button */}
            <button
              className="p-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b px-6">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: Calendar },
            { id: "availability", label: "Availability", icon: Clock },
            { id: "appointments", label: "Appointments", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {activeTab === "overview" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold">Welcome, {user?.name}</h2>
            <p className="text-gray-600 mt-1">Here is your dashboard overview</p>
          </div>
        )}

        {activeTab === "availability" && <AvailabilityComponent />}

        {activeTab === "appointments" && (
          <AppointmentsSection doctorId={user?.id} />
        )}
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
            
            <button
              onClick={logout}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="mt-3 w-full py-2 px-4 border rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
