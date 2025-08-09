// src/modules/admin/therapists-profile/TherapistProfile.jsx
import { useParams, useNavigate } from "react-router-dom";
import TherapistProfileDetails from "@/modules/admin/therapists-profile/components/therapistProfile";
import { Sidebar } from "@/components/ui/aside";

export const TherapistProfile = () => {
  const { id: therapistId } = useParams(); // ✅ get ID from URL
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    console.log(`Status changed for therapist ${id} to ${newStatus}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TherapistProfileDetails
            therapistId={therapistId}
            navigate={navigate}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};
