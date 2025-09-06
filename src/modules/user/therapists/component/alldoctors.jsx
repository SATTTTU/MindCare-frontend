import { useState, useMemo } from "react";
import { Star, Users, Calendar, Search, Filter, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetDoctors } from "../api/usegetAllDOctors";

export const DoctorsPage = () => {
  const { data: doctors, isLoading, isError, error } = useGetDoctors();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("name"); // name, rating, experience

  // Extract specialties for filter dropdown
  const specialties = useMemo(() => {
    if (!doctors || !Array.isArray(doctors)) return ["All"];
    const uniqueSpecialties = [...new Set(doctors.map((d) => d.specialization))];
    return ["All", ...uniqueSpecialties.sort()];
  }, [doctors]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    if (!doctors || !Array.isArray(doctors)) return [];
    
    let filtered = doctors.filter((doc) => {
      // Only show approved doctors
      const isApproved = doc.applicationStatus === "Approved";
      if (!isApproved) return false;

      // Search filter
      const matchesSearch =
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.contactInfo?.toLowerCase().includes(searchTerm.toLowerCase());

      // Specialty filter
      const matchesSpecialty =
        selectedSpecialty === "All" || doc.specialization === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 4.5) - (a.rating || 4.5);
        case "experience":
          return (b.experience || 0) - (a.experience || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [doctors, searchTerm, selectedSpecialty, sortBy]);

  const getImageUrl = (profileImageUrl) => {
    if (!profileImageUrl) return "/assets/default-doctor.png";
    if (profileImageUrl.startsWith("http")) return profileImageUrl;
    return `${import.meta.env.VITE_APP_API_URL || ""}${profileImageUrl}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading doctors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium">Failed to load doctors</p>
              <p className="text-red-500 text-sm mt-1">
                {error?.response?.data?.message || error?.message || "Please try again later"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Doctor</h1>
          <p className="text-blue-100 text-lg">
            Connect with experienced healthcare professionals for your wellness journey
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name, specialty, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[120px]"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
              </select>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
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
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all specialties
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("All");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(`/therapists/${doctor.id}`)}
              >
                <div className="p-6">
                  {/* Doctor Image */}
                  <div className="relative mb-4">
                    <img
                      src={getImageUrl(doctor.profileImageUrl)}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors"
                      onError={(e) => {
                        e.target.src = "/assets/default-doctor.png";
                      }}
                    />
                    {doctor.isOnline && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
                        Online
                      </div>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600 font-medium text-sm mb-2">
                      {doctor.specialization}
                    </p>
                    {doctor.contactInfo && (
                      <p className="text-gray-600 text-xs mb-2 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {doctor.contactInfo}
                      </p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.rating || "4.5"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{doctor.patientCount || "120"}+</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience || "5"}y</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/therapists/${doctor.id}`);
                    }}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm group-hover:bg-blue-700"
                  >
                    View Profile & Book
                  </button>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle quick message
                      }}
                      className="flex-1 text-xs py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Message
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle quick call
                      }}
                      className="flex-1 text-xs py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};