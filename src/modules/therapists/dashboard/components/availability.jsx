"use client";
import React, { useState, useEffect } from "react";
import { Clock, Edit3, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePostAvailability } from "../api/addAvailibility";
import { usegetDoctorAvailaibity } from "../api/getAvailability";

const days = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

// Helper: Get next date for a given weekday
const getNextDateOfWeekday = (weekday) => {
  const dayNumbers = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const today = new Date();
  const todayNum = today.getDay();
  let diff = dayNumbers[weekday] - todayNum;
  if (diff < 0) diff += 7; // move to next week if passed
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + diff);
  return nextDay.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const AvailabilityComponent = () => {
  const { user } = useAuth();
  const doctorId = user?.doctorInfo?.doctorId;

  // Fetch doctor's availability from backend
  const { data: fetchedAvailability, isLoading: isFetching } =
    usegetDoctorAvailaibity(doctorId);

  const { mutateAsync: saveAvailability, isLoading: isSaving } =
    usePostAvailability();

  const [availability, setAvailability] = useState({});
  const [editingDay, setEditingDay] = useState(null);

  // Initialize state after fetching availability
  useEffect(() => {
    const initialState = {
      monday: { enabled: false, start: "09:00", end: "17:00" },
      tuesday: { enabled: false, start: "09:00", end: "17:00" },
      wednesday: { enabled: false, start: "09:00", end: "17:00" },
      thursday: { enabled: false, start: "09:00", end: "17:00" },
      friday: { enabled: false, start: "09:00", end: "17:00" },
      saturday: { enabled: false, start: "09:00", end: "17:00" },
      sunday: { enabled: false, start: "09:00", end: "17:00" },
    };

    if (fetchedAvailability?.data?.length) {
      fetchedAvailability.data.forEach((slot) => {
        const date = new Date(slot.startTime);
        const weekdayNumber = date.getUTCDay(); // 0=Sunday ... 6=Saturday
        const dayKeys = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ];
        const dayKey = dayKeys[weekdayNumber];

        initialState[dayKey] = {
          enabled: true,
          start: slot.startTime.split("T")[1].slice(0, 5),
          end: slot.endTime.split("T")[1].slice(0, 5),
        };
      });
    }

    setAvailability(initialState);
  }, [fetchedAvailability]);

  const handleAvailabilityChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSaveDay = async (day) => {
    if (!doctorId) {
      alert("Doctor profile not found");
      return;
    }

    const dateStr = getNextDateOfWeekday(day);
    const startTime = new Date(`${dateStr}T${availability[day].start}`).toISOString();
    const endTime = new Date(`${dateStr}T${availability[day].end}`).toISOString();

    const payload = { startTime, endTime };

    try {
      await saveAvailability({ doctorId, ...payload });
      alert(`Saved availability for ${days[day]}`);
      setEditingDay(null);
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to save availability");
    }
  };

  if (isFetching) return <div>Loading availability...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Weekly Availability</h3>
        <p className="text-gray-600 mt-1">Set your available hours for each day</p>
      </div>

      <div className="p-6 space-y-4">
        {Object.entries(availability).map(([day, schedule]) => (
          <div
            key={day}
            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-24 font-medium text-gray-900">{days[day]}</div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={schedule.enabled}
                  onChange={(e) =>
                    handleAvailabilityChange(day, "enabled", e.target.checked)
                  }
                  disabled={editingDay !== day}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Available</span>
              </label>
            </div>

            {schedule.enabled ? (
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <input
                  type="time"
                  value={schedule.start}
                  onChange={(e) =>
                    handleAvailabilityChange(day, "start", e.target.value)
                  }
                  disabled={editingDay !== day}
                  className="border border-gray-300 rounded px-3 py-1 text-sm disabled:bg-gray-50 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={schedule.end}
                  onChange={(e) =>
                    handleAvailabilityChange(day, "end", e.target.value)
                  }
                  disabled={editingDay !== day}
                  className="border border-gray-300 rounded px-3 py-1 text-sm disabled:bg-gray-50 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <span className="text-gray-400 italic">Not available</span>
            )}

            <div>
              {editingDay === day ? (
                <button
                  onClick={() => handleSaveDay(day)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4" />
                  <span>{isSaving ? "Saving..." : "Save"}</span>
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
