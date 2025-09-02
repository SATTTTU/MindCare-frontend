
import { useState, useMemo } from "react";
import { Star, Users, Calendar, Search, Filter } from "lucide-react";
import { useGetDoctors } from "../api/usegetAllDOctors";
import { useNavigate } from "react-router-dom";

export const  DoctorsPage=() =>{
  const { data: doctors, isLoading, isError } = useGetDoctors();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  // ✅ Always define hooks (safe defaults when no data yet)
  const specialties = useMemo(() => {
    if (!doctors) return ["All"];
    return ["All", ...new Set(doctors.map((d) => d.specialization))];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];
    return doctors.filter((doc) => {
      const isApproved = doc.applicationStatus === "Approved";

      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "All" || doc.specialization === selectedSpecialty;

      return isApproved && matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchTerm, selectedSpecialty]);

    const navigate = useNavigate();

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading & Error messages (safe, after hooks) */}
      {isLoading && (
        <div className="text-center py-8">Loading doctors...</div>
      )}
      {isError && (
        <div className="text-center py-8 text-red-500">
          Failed to load doctors.
        </div>
      )}

      {/* Doctors Grid */}
      {!isLoading && !isError && (
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Doctors ({filteredDoctors.length})
            </h2>
            <p className="text-gray-600">
              Choose from our network of qualified healthcare professionals
            </p>
          </div>

          {filteredDoctors.length === 0 ? (
            <p className="text-center text-gray-500">No doctors found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="relative mb-4">
                     <img
  src={
    doctor.profileImageUrl
      ? `${import.meta.env.VITE_APP_API_URL}${doctor.profileImageUrl}`
      : "/assets/default-doctor.png"
  }
  alt={doctor.name}
  className="w-20 h-20 rounded-full mx-auto object-cover"
/>
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600 text-center mb-3 font-medium">
                      {doctor.specialization}
                    </p>
                    <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
                      {doctor.contactInfo}
                    </p>

                    <div className="flex justify-center items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>120</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>5 yrs</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/therapists/${doctor.id}`)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Profile & Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
