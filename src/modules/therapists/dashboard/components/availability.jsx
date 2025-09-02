"use client";
import React, { useState } from "react";
import { Clock, Edit3, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePostAvailability } from "../api/addAvailibility";

const days = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const AvailabilityComponent = () => {
  const { user } = useAuth();
  const { mutateAsync: saveAvailability, isLoading } = usePostAvailability();

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "10:00", end: "16:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "15:00" },
    saturday: { enabled: false, start: "10:00", end: "14:00" },
    sunday: { enabled: false, start: "10:00", end: "14:00" },
  });

  const [editingDay, setEditingDay] = useState(null);

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };
 const handleSaveDay = async (day) => {
    if (!user?.id){     console.log("ram,use",user);
;} ;

    // Construct the payload including the 'day'
   const payload = {
  day: day,
  startTime: new Date(`1970-01-01T${availability[day].start}:00Z`).toISOString(),
  endTime: new Date(`1970-01-01T${availability[day].end}:00Z`).toISOString(),
};

    try {
     await saveAvailability({ doctorId: user.id, ...payload });

      alert(`Saved availability for ${days[day]}`);
      setEditingDay(null);
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to save availability");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Weekly Availability</h3>
        <p className="text-gray-600 mt-1">Set your available hours for each day</p>
      </div>

      <div className="p-6 space-y-4">
        {Object.entries(availability).map(([day, schedule]) => (
          <div key={day} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            {/* Day Name & Toggle */}
            <div className="flex items-center space-x-4">
              <div className="w-24 font-medium text-gray-900">{days[day]}</div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={schedule.enabled}
                  onChange={(e) => handleAvailabilityChange(day, "enabled", e.target.checked)}
                  disabled={editingDay !== day}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Available</span>
              </label>
            </div>

            {/* Time Inputs */}
            {schedule.enabled ? (
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <input
                  type="time"
                  value={schedule.start}
                  onChange={(e) => handleAvailabilityChange(day, "start", e.target.value)}
                  disabled={editingDay !== day}
                  className="border border-gray-300 rounded px-3 py-1 text-sm disabled:bg-gray-50 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={schedule.end}
                  onChange={(e) => handleAvailabilityChange(day, "end", e.target.value)}
                  disabled={editingDay !== day}
                  className="border border-gray-300 rounded px-3 py-1 text-sm disabled:bg-gray-50 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <span className="text-gray-400 italic">Not available</span>
            )}

            {/* Edit/Save Button */}
            <div>
              {editingDay === day ? (
                <button
                  onClick={() => handleSaveDay(day)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  <span>{isLoading ? "Saving..." : "Save"}</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditingDay(day)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
