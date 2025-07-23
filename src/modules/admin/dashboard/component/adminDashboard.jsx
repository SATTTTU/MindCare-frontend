import React, { useState, useRef, useCallback } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import { FaUsers, FaUserMd, FaChartLine, FaExclamationTriangle, FaCalendarAlt, FaFlag, FaUserCheck } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { AdminProfileCard } from "./profilecard";

// Custom hook to detect clicks outside a specified element
const useOutsideClick = (ref, callback) => {
  const handleClick = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};

// Profile Card Component for Admin


// Sidebar Component for Admin
const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-indigo-600">MindCare Admin</h2>
      </div>
      <nav className="p-4 space-y-2">
        <a href="#" className="flex items-center px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg">
          <FaChartLine className="mr-3" />
          Dashboard
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <FaUsers className="mr-3" />
          User Management
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <FaUserMd className="mr-3" />
          Therapist Management
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <FaCalendarAlt className="mr-3" />
          Appointments
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
          <FaFlag className="mr-3" />
          Reports & Alerts
        </a>
      </nav>
    </div>
  );
};

// A modern, themed stats card with skeleton loading
const AdminStatsCard = ({ icon, title, value, trend, delay, isLoading, status = "normal" }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm animate-pulse">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
        </div>
        <div className="mt-4 h-5 bg-gray-200 rounded w-1/2"></div>
        <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  const statusColors = {
    normal: "text-green-500",
    warning: "text-yellow-500",
    critical: "text-red-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 bg-indigo-100 rounded-lg">{icon}</div>
        {status !== "normal" && (
          <div className={`text-xs px-2 py-1 rounded-full ${status === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
            {status === "warning" ? "Warning" : "Critical"}
          </div>
        )}
      </div>
      <p className="mt-4 text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className={`mt-1 text-sm font-semibold ${statusColors[status]}`}>{trend}</p>
    </motion.div>
  );
};

// A list for recent admin activities
const RecentAdminActivityList = ({ activities, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center p-2">
                            <div className="w-10 h-10 rounded-lg bg-gray-200 mr-4"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent System Activity</h3>
            <div className="space-y-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`p-3 rounded-lg mr-4 ${activity.priority === "high" ? "bg-red-100" : activity.priority === "medium" ? "bg-yellow-100" : "bg-gray-100"}`}>
                            {activity.icon}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-700">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-sm text-gray-400">{activity.time}</span>
                            {activity.priority === "high" && (
                                <div className="text-xs text-red-600 font-semibold mt-1">High Priority</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// System Alerts Component
const SystemAlerts = ({ alerts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
            alert.type === "critical" ? "bg-red-50 border-red-500" :
            alert.type === "warning" ? "bg-yellow-50 border-yellow-500" :
            "bg-blue-50 border-blue-500"
          }`}>
            <div className="flex items-center justify-between">
              <p className={`font-semibold ${
                alert.type === "critical" ? "text-red-800" :
                alert.type === "warning" ? "text-yellow-800" :
                "text-blue-800"
              }`}>{alert.title}</p>
              <span className="text-sm text-gray-500">{alert.time}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminDashboard = React.memo(() => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const adminStats = [
    {
      icon: <FaUsers className="text-blue-500 text-xl" />,
      title: "Total Active Users",
      value: "1,247",
      trend: "+127 this month",
      status: "normal"
    },
    {
      icon: <FaUserMd className="text-green-500 text-xl" />,
      title: "Active Therapists",
      value: "48",
      trend: "+3 new this week",
      status: "normal"
    },
    {
      icon: <FaCalendarAlt className="text-purple-500 text-xl" />,
      title: "Today's Sessions",
      value: "156",
      trend: "92% completion rate",
      status: "normal"
    },
    {
      icon: <FaExclamationTriangle className="text-red-500 text-xl" />,
      title: "Critical Alerts",
      value: "3",
      trend: "Requires immediate attention",
      status: "critical"
    },
  ];

  const recentActivities = [
    { 
      id: 1, 
      icon: <FaUserCheck className="text-green-500"/>, 
      title: "New Therapist Approved", 
      description: "Dr. Emily Chen has been verified and approved.", 
      time: "15 min ago",
      priority: "normal"
    },
    { 
      id: 2, 
      icon: <FaFlag className="text-red-500"/>, 
      title: "Crisis Alert Resolved", 
      description: "High-risk user case successfully handled by emergency team.", 
      time: "1h ago",
      priority: "high"
    },
    { 
      id: 3, 
      icon: <FaUsers className="text-blue-500"/>, 
      title: "Bulk User Registration", 
      description: "45 new users registered through corporate wellness program.", 
      time: "2h ago",
      priority: "normal"
    },
    { 
      id: 4, 
      icon: <FaExclamationTriangle className="text-yellow-500"/>, 
      title: "System Maintenance", 
      description: "Scheduled database optimization completed successfully.", 
      time: "4h ago",
      priority: "medium"
    },
    { 
      id: 5, 
      icon: <FaChartLine className="text-purple-500"/>, 
      title: "Weekly Report Generated", 
      description: "User engagement and system performance metrics compiled.", 
      time: "6h ago",
      priority: "normal"
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "critical",
      title: "Server Load High",
      message: "Primary server CPU usage at 89%. Consider load balancing.",
      time: "5 min ago"
    },
    {
      id: 2,
      type: "warning",
      title: "Payment Processing Delayed",
      message: "Some subscription renewals experiencing 10-15 minute delays.",
      time: "23 min ago"
    },
    {
      id: 3,
      type: "info",
      title: "Backup Completed",
      message: "Daily data backup finished successfully at 2:00 AM.",
      time: "6h ago"
    }
  ];

  const notifications = [
    { id: 1, message: "3 new therapist applications pending review." },
    { id: 2, message: "Monthly system report is ready for download." },
    { id: 3, message: "Crisis intervention protocol activated for User #1247." },
    { id: 4, message: "Server maintenance scheduled for Sunday 2:00 AM." }
  ];

  const toggleProfile = useCallback(() => setShowProfile((p) => !p), []);
  const toggleNotifications = useCallback(() => setShowNotifications((p) => !p), []);

  useOutsideClick(profileRef, () => setShowProfile(false));
  useOutsideClick(notificationRef, () => setShowNotifications(false));

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin<br/>Dashboard
          </h1>
          <div className="flex items-center gap-6">
          
            <div className="relative">
                <div onClick={toggleProfile} className="cursor-pointer">
                    <img src="https://i.pravatar.cc/40?u=admin" alt="Admin Profile" className="w-10 h-10 rounded-full border-2 border-indigo-200"/>
                </div>
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    ref={profileRef}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 bg-white rounded-lg z-50 shadow-xl border border-gray-100">
                    <AdminProfileCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-gradient-to-r from-indigo-100/80 to-purple-100/80 border border-indigo-200/50 rounded-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-indigo-900">System Overview</h2>
            <p className="text-indigo-700 mt-1">Monitor and manage your mental health platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {adminStats.map((stat, index) => (
              <AdminStatsCard key={index} {...stat} delay={index} isLoading={isLoading} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentAdminActivityList activities={recentActivities} isLoading={isLoading} />
            <SystemAlerts alerts={systemAlerts} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
});