import React, { useState, useRef, useCallback } from "react";
import { IoIosNotifications, IoMdSearch } from "react-icons/io";
import { FaCalendarCheck, FaHeartbeat, FaSmile, FaBookOpen } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/components/ui/aside";
import { ProfileCard } from "./profilecard";
import { useAuth } from "@/context/AuthContext";

// Hook for detecting outside clicks
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

// Stats Card
const StatsCard = ({ icon, title, value, trend, delay, isLoading }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 bg-indigo-100 rounded-lg">{icon}</div>
      </div>
      <p className="mt-4 text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="mt-1 text-sm text-green-500 font-semibold">{trend}</p>
    </motion.div>
  );
};

// Recent Activity List
const RecentActivityList = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
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
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="p-3 bg-gray-100 rounded-lg mr-4">{activity.icon}</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-700">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <span className="text-sm text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UserDashboard = React.memo(() => {
  const { user } = useAuth(); // 🔹 real user
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const dashboardStats = [
    {
      icon: <FaCalendarCheck className="text-blue-500 text-xl" />,
      title: "Upcoming Appointments",
      value: "3",
      trend: "+1 this week",
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-xl" />,
      title: "Wellness Score",
      value: "78%",
      trend: "+5% improvement this month",
    },
    {
      icon: <FaSmile className="text-yellow-500 text-xl" />,
      title: "Mood Trend",
      value: "Positive",
      trend: "Based on last 7 entries",
    },
    {
      icon: <FaBookOpen className="text-green-500 text-xl" />,
      title: "Journal Entries",
      value: "12",
      trend: "+3 this month",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      icon: <FaBookOpen className="text-green-500" />,
      title: "Journal Entry Added",
      description: "Reflection on today's progress.",
      time: "2h ago",
    },
    {
      id: 2,
      icon: <FaCalendarCheck className="text-blue-500" />,
      title: "Session Confirmed",
      description: "With Dr. Anya Sharma.",
      time: "1d ago",
    },
    {
      id: 3,
      icon: <FaSmile className="text-yellow-500" />,
      title: "Mood Logged",
      description: "Feeling calm and focused.",
      time: "2d ago",
    },
  ];

  const notifications = [
    { id: 1, message: "Reminder: Your appointment with Dr. Sharma is tomorrow." },
    { id: 2, message: "A new article on 'Mindfulness' is available." },
    { id: 3, message: "Your weekly progress report is ready to view." },
  ];

  const toggleProfile = useCallback(() => setShowProfile((p) => !p), []);
  const toggleNotifications = useCallback(
    () => setShowNotifications((p) => !p),
    []
  );

  useOutsideClick(profileRef, () => setShowProfile(false));
  useOutsideClick(notificationRef, () => setShowNotifications(false));

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Mental Health
            <br />
            Dashboard
          </h1>
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button onClick={toggleNotifications} className="relative">
                <IoIosNotifications className="text-2xl text-gray-600 hover:text-indigo-500 transition" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    ref={notificationRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-100"
                  >
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                      Notifications
                    </h2>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        {n.message}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative">
              <div onClick={toggleProfile} className="cursor-pointer">
                <img
                  src={user?.avatar || `https://i.pravatar.cc/40?u=${user?.email}`}
                  alt={user?.name || "Profile"}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    ref={profileRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 bg-white rounded-lg z-50 shadow-xl border border-gray-100"
                  >
                    <ProfileCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-indigo-100/50 border border-indigo-200/50 rounded-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-indigo-900">
              Welcome back, {user?.name || "User"}!
            </h2>
            <p className="text-indigo-700 mt-1">
              Here's your mental health journey overview.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {dashboardStats.map((stat, index) => (
              <StatsCard
                key={index}
                {...stat}
                delay={index}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Recent Activity */}
          <RecentActivityList
            activities={recentActivities}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
});
