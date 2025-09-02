"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Settings,
  Bell,
  Check,
  X,
} from "lucide-react";
import { TherapistSidebar } from "@/components/ui/therapistSideBar/sideBar";
import { useAuth } from "@/context/AuthContext";
import { AvailabilityComponent } from "./availability";

export const TherapistDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const appointmentRequests = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "2025-09-03",
      time: "10:00 AM",
      type: "Initial Consultation",
      status: "pending",
      phone: "(555) 123-4567",
      email: "sarah.j@email.com",
      notes: "Seeking help with anxiety and stress management",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      date: "2025-09-03",
      time: "2:00 PM",
      type: "Follow-up Session",
      status: "pending",
      phone: "(555) 234-5678",
      email: "m.chen@email.com",
      notes: "Progress check for CBT treatment",
    },
  ];

  const [requests, setRequests] = useState(appointmentRequests);

  const handleRequestAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: action === "approve" ? "confirmed" : "rejected" }
          : req
      )
    );
  };

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
      <TherapistSidebar />

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
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
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

      <div className="px-6 py-6 space-y-6">
        {activeTab === "overview" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold">Welcome, {user?.name}</h2>
            <p className="text-gray-600 mt-1">Here is your dashboard overview</p>
          </div>
        )}

        {activeTab === "availability" && <AvailabilityComponent />}

        {activeTab === "appointments" && (
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {requests.map((req) => (
              <div key={req.id} className="p-6 flex justify-between">
                <div>
                  <h4 className="font-semibold">{req.patientName}</h4>
                  <p className="text-sm text-gray-600">
                    {req.date} at {req.time} • {req.type}
                  </p>
                  <p className="text-xs text-gray-500">{req.email}</p>
                  <span
                    className={`mt-2 inline-block px-2 py-1 rounded text-xs ${getStatusColor(
                      req.status
                    )}`}
                  >
                    {req.status}
                  </span>
                </div>
                {req.status === "pending" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleRequestAction(req.id, "approve")}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRequestAction(req.id, "reject")}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
