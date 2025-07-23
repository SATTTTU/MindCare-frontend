import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Mock Components for demonstration
const ConfirmModal = ({ onCancel, onConfirm, title, message }) => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-xl">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="my-2 text-gray-600">{message}</p>
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">Logout</button>
      </div>
    </div>
  </div>
);

const SettingsCard = ({ onClose }) => (
    <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Settings</h3>
        <p>Settings interface goes here.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">Close</button>
    </div>
);


export const ProfileCard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock user data
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://i.pravatar.cc/80?u=johnD",
    isPremium: true,
  };
  
  const handleLogout = () => {
    console.log("Logging out...");
    setShowLogoutModal(false);
    // Add actual logout logic here
  };

  if (showSettings) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-white rounded-2xl border border-gray-200 overflow-hidden relative"
        >
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <FaTimes />
            </button>
            <SettingsCard onClose={() => setShowSettings(false)} />
        </motion.div>
    );
  }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-72 bg-white rounded-2xl border border-gray-200 overflow-hidden relative"
        >
            {/* Profile Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <img
                        src={profileData.image}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">{profileData.name}</h2>
                        <p className="text-sm text-gray-500">{profileData.email}</p>
                        {profileData.isPremium && (
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                                Premium Member
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
                <nav className="space-y-1">
                    <Link
                        to="/profile"
                        className="group flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaUser className="text-gray-400 group-hover:text-indigo-500" />
                        <span className="text-gray-700 font-medium group-hover:text-indigo-500">
                            My Profile
                        </span>
                    </Link>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="w-full group flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaCog className="text-gray-400 group-hover:text-indigo-500" />
                        <span className="text-gray-700 font-medium group-hover:text-indigo-500">
                            Settings
                        </span>
                    </button>
                </nav>

                {/* Logout Button */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full group flex items-center space-x-3 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </div>

            {showLogoutModal && (
                <ConfirmModal
                    title="Confirm Logout"
                    message="Are you sure you want to sign out?"
                    onCancel={() => setShowLogoutModal(false)}
                    onConfirm={handleLogout}
                />
            )}
        </motion.div>
    );
};