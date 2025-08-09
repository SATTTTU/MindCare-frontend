import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { useGetAllTherapists } from "@/modules/admin/therapists/api/get-alltherapists";
import { Sidebar } from "@/components/ui/aside";
import TherapistFilter from "@/modules/admin/therapists/components/therapistsFilter";
import TherapistTable from "@/modules/admin/therapists/components/therapistTable";
import Pagination from "@/components/ui/pagination/pagination";


export const TherapistRoute = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Using the query hook to fetch all therapists
  const {
    mutateAsync: fetchTherapists,
    isLoading,
    isError,
    error,
    data: apiResponse
  } = useGetAllTherapists({
    mutationConfig: {
      onSuccess: (response) => {
        console.log("API Response:", response);
      },
    },
  });

  // Extract all therapists from the API response
  // API returns array directly, not wrapped in data property
  const allTherapists = Array.isArray(apiResponse) ? apiResponse : (apiResponse?.data || []);

  // Fetch therapists on initial load
  useEffect(() => {
    fetchTherapists();
  }, [fetchTherapists]);

  // Apply filters whenever filter criteria or therapists data changes
  useEffect(() => {
    if (!allTherapists.length) return;

    let result = [...allTherapists];

    // Apply name search filter
    if (search) {
      result = result.filter((therapist) =>
        therapist?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(therapist => {
        const status = therapist.applicationStatus?.toLowerCase().trim();
        const filterValue = statusFilter.toLowerCase();
        
        // Handle empty status as "pending" or "unknown"
        if (!status || status === "") {
          return filterValue === "pending" || filterValue === "unknown";
        }
        
        return status === filterValue;
      });
    }

    // Apply specialization filter
    if (specializationFilter !== "all") {
      result = result.filter(therapist => 
        therapist.specialization?.toLowerCase().includes(specializationFilter.toLowerCase())
      );
    }

    // Update filtered therapists and pagination
    setFilteredTherapists(result);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    
    // Reset to first page when filters change
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [allTherapists, search, statusFilter, specializationFilter]);

  // Get current page items
  const currentTherapists = filteredTherapists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="flex h-screen font-sans bg-gray-100">
      <Sidebar />
      <div className="p-6 w-full">
        <Link
          to="/admin-dashboard"
          className="mr-2 p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">All Therapists</h1>
        
        <div className="bg-white p-6 shadow-md rounded-lg">
          <TherapistFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            specializationFilter={specializationFilter}
            setSpecializationFilter={setSpecializationFilter}
          />
          {isError && (
            <div className="text-red-500 mb-4">
              Error: {error?.message || "Failed to fetch therapists"}
            </div>
          )}
          <TherapistTable
            therapists={currentTherapists}
            navigate={navigate}
            isLoading={isLoading}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};