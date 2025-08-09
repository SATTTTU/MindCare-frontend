import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/ui/aside";
import TherapistProfileDetails from "@/modules/admin/therapists-profile/components/therapistProfile";

export const TherapistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleStatusChange = (therapistId, newStatus) => {
    console.log(`Status changed for therapist ${therapistId} to ${newStatus}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TherapistProfileDetails
            cookId={id}
            navigate={navigate}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};
