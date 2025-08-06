import React from "react";
import TherapistRow from "./therapistRow";

const TherapistTable = ({ therapists, navigate, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading therapists...</p>
      </div>
    );
  }

  // Enhanced empty check
  if (!therapists || !Array.isArray(therapists) || therapists.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg mb-2">No therapists found</div>
        <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Specialization
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Info
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {therapists.map((therapist) => (
            <TherapistRow
              key={therapist.id || therapist.userId} 
              therapist={therapist} 
              navigate={navigate} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistTable;