import React from "react";

const TherapistRow = ({ therapist, navigate }) => {
  // Use optional chaining to avoid errors if properties don't exist
  const {
    id,
    name,
    specialization,
    contactInfo,
    userId,
    applicationStatus,
  } = therapist || {};

  // Determine status display text and class based on applicationStatus
  let statusText = "Unknown";
  let statusClass = "bg-gray-100 text-gray-800";

  // Handle application status
  if (applicationStatus?.toLowerCase() === "approved") {
    statusText = "Approved";
    statusClass = "bg-green-100 text-green-800";
  } else if (applicationStatus?.toLowerCase() === "pending") {
    statusText = "Pending";
    statusClass = "bg-yellow-100 text-yellow-800";
  } else if (applicationStatus?.toLowerCase() === "under review") {
    statusText = "Under Review";
    statusClass = "bg-blue-100 text-blue-800";
  } else if (applicationStatus?.toLowerCase() === "rejected") {
    statusText = "Rejected";
    statusClass = "bg-red-100 text-red-800";
  } else if (applicationStatus) {
    statusText = applicationStatus;
    statusClass = "bg-gray-100 text-gray-800";
  }

  // Format contact info for display
  const displayContact = contactInfo ? 
    (contactInfo.length > 20 ? `${contactInfo.substring(0, 20)}...` : contactInfo) : 
    "Not provided";

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {name || "Unknown"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {specialization || "Not specified"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
        {displayContact}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
          {statusText}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span
          onClick={() => navigate(`/admin/therapistDetails/${id}`)}
          className="text-blue-500 hover:text-blue-700 hover:underline cursor-pointer font-medium"
        >
          View Profile
        </span>
      </td>
    </tr>
  );
};

export default TherapistRow;