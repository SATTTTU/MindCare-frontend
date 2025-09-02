"use client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Users, Calendar, MapPin, GraduationCap } from "lucide-react";
import { useGetSingleDoctor } from "../api/usegetSingleDoctor";
import { usegetDoctorAvailaibity } from "../api/getDoctorAvailability";

export const DoctorProfile = () => {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { data: doctorData, isLoading: loadingDoctor, isError: errorDoctor } = useGetSingleDoctor(id);

const { data: availabilityData, isLoading: loadingAvailability } = usegetDoctorAvailaibity(id);

const availability = Array.isArray(availabilityData) 
  ? availabilityData 
  : Array.isArray(availabilityData?.data) 
    ? availabilityData.data 
    : [];

  if (loadingDoctor || loadingAvailability) return <p className="text-center mt-10">Loading doctor profile...</p>;
  if (errorDoctor || !doctorData) return <p className="text-center mt-10 text-red-600">Doctor not found</p>;

  // Axios response might wrap data in `response.data`
  const doctor = doctorData || doctorData;

  const imageUrl = doctor.profileImageUrl?.startsWith("http")
    ? doctor.profileImageUrl
    : `${import.meta.env.VITE_APP_API_URL || "http://localhost:5000"}${doctor.profileImageUrl}`;

  const handleBooking = () => {
    if (!selectedSlot) return alert("Please select a slot");
    alert(`Booked slot: ${new Date(selectedSlot.startTime).toLocaleString()} - ${new Date(selectedSlot.endTime).toLocaleTimeString()}`);
    // TODO: Call API to book the slot
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-xl bg-white mt-10">
      {/* Doctor Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative inline-block mb-4">
          <img
            src={imageUrl}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border"
            onError={(e) => (e.target.src = "/default-doctor.png")}
          />
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 fill-white" />
            {doctor.rating || "4.5"}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
        <p className="text-gray-600 mt-2">{doctor.description || "No description available."}</p>
      </div>

      {/* Doctor Stats */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="w-5 h-5" />
          <span>{availability?.length || 0} slots</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>{doctor.experience || "2 yrs"} experience</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span>{doctor.location || "Not specified"}</span>
        </div>
      </div>

      {/* Availability Slots */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Available Slots</h4>
        <div className="flex flex-wrap gap-3">
          {availability?.map((slot) => (
            <button
              key={slot.id}
              disabled={slot.isBooked}
              onClick={() => setSelectedSlot(slot)}
              className={`px-3 py-2 rounded-lg border ${
                slot.isBooked
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : selectedSlot?.id === slot.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-blue-50"
              }`}
            >
              {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleTimeString()}
            </button>
          ))}
        </div>
      </div>

      {/* Book Appointment Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Book Appointment
      </button>
    </div>
  );
};
