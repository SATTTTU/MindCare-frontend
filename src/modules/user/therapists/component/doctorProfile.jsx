import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Users, Calendar, MapPin } from "lucide-react";
import { useGetSingleDoctor } from "../api/usegetSingleDoctor";
import { usegetDoctorAvailaibity } from "../api/getDoctorAvailability";
import { AppointmentForm } from "./bookDoctors";
import { useAuth } from "@/context/AuthContext"; // ✅ import your hook

export const DoctorProfile = () => {
  const { id } = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const { user } = useAuth(); // ✅ get logged-in user

  const { data: doctorData, isLoading: loadingDoctor, isError: errorDoctor } =
    useGetSingleDoctor(id);

  const { data: availabilityData, isLoading: loadingAvailability } =
    usegetDoctorAvailaibity(id);

  const availability = Array.isArray(availabilityData)
    ? availabilityData
    : Array.isArray(availabilityData?.data)
    ? availabilityData.data
    : [];

  if (loadingDoctor || loadingAvailability)
    return <p className="text-center mt-10">Loading doctor profile...</p>;
  if (errorDoctor || !doctorData)
    return <p className="text-center mt-10 text-red-600">Doctor not found</p>;

  const doctor = doctorData;
  const imageUrl = doctor.profileImageUrl?.startsWith("http")
    ? doctor.profileImageUrl
    : `${import.meta.env.VITE_APP_API_URL || "http://localhost:5000"}${
        doctor.profileImageUrl
      }`;

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
        <p className="text-gray-600 mt-2">
          {doctor.description || "No description available."}
        </p>
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
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {new Date(slot.startTime).toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment Form */}
      {selectedSlot && (
        <AppointmentForm
          doctor={doctor}
          user={user} // ✅ use real auth user here
          availableSlots={availability}
          onSuccess={() => setSelectedSlot(null)}
          onCancel={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};
