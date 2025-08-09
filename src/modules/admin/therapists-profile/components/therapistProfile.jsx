
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  FileText,
  Eye,
} from "react-feather";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { usegetDocuments } from "../api/getDocuments";
import { useVerifyTherapist } from "../api/verify-cook";
import { useDeleteTherapist } from "../api/useDeleteTherapist";

// Helper: get full file URL
const getFullImageUrl = (path) => {
  const baseUrl = import.meta.env.VITE_BUCKET_URL;
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${baseUrl}${path}`;
};

// Document mapping
const documentConfig = [
  { key: "PasswordSizedPhoto", label: "Passport Size Photo", modalKey: "passportPhoto" },
  { key: "CitizenshipFront", label: "Citizenship Front", modalKey: "citizenshipFront" },
  { key: "CitizenshipBack", label: "Citizenship Back", modalKey: "citizenshipBack" },
  { key: "Certificate", label: "Certificates", modalKey: "cookingCertificate" },
];

const TherapistProfileDetails = ({ cookId, navigate, onStatusChange }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(null);

  // Fetch data
  const { isError, isLoading, data: cookData } = usegetDocuments(cookId);

  // Keep only the latest doc per type
  const latestDocuments = useMemo(() => {
    const docs = cookData?.documents || [];
    const latest = {};
    for (const doc of docs) {
      if (!latest[doc.documentType] || doc.id > latest[doc.documentType].id) {
        latest[doc.documentType] = doc;
      }
    }
    return latest;
  }, [cookData]);

  // Mutations
  const { mutateAsync: verifyCook, isLoading: isVerifying } = useVerifyTherapist(therapistId, {
    mutationConfig: {
      onSuccess: () => {
        toast.success("Therapist verified successfully");
        onStatusChange?.(cookId, "Verified");
      },
      onError: () => toast.error("Failed to verify therapist"),
    },
  });

  const { mutateAsync: deleteCook, isLoading: isDeleting, error: deleteError } = useDeleteTherapist(therapistId, {
    mutationConfig: {
      onSuccess: () => {
        toast.success("Therapist deleted successfully");
        setShowConfirmDelete(false);
        navigate("/admin/therapists");
      },
      onError: () => toast.error("Failed to delete therapist"),
    },
  });

  // Map cooked data
  const cook = useMemo(() => {
    if (!cookData) return null;
    const mappedDocs = documentConfig.reduce((acc, doc) => {
      const docData = latestDocuments[doc.key];
      acc[doc.modalKey] = getFullImageUrl(docData?.filePath);
      return acc;
    }, {});
    return {
      id: cookData?.id || cookId,
      name: cookData?.name || "Unknown",
      email: cookData?.email || "N/A",
      phone: cookData?.phone || "N/A",
      image: getFullImageUrl(latestDocuments.PasswordSizedPhoto?.filePath) ||
        "https://via.placeholder.com/150",
      status: mapApprovalStatusToDisplay(cookData?.approval_status),
      joinedDate: cookData?.joined_date || new Date().toISOString(),
      documents: mappedDocs,
    };
  }, [cookData, latestDocuments, cookId]);

  function mapApprovalStatusToDisplay(status) {
    switch (status) {
      case "approved": return "Verified";
      case "under-review": return "Pending";
      case "rejected": return "Unverified";
      default: return "Pending";
    }
  }

  // Status colors
  const statusColor = { Verified: "green", Pending: "yellow", Unverified: "red" };

  if (isLoading) return <div className="p-4">Loading therapist details...</div>;
  if (isError) return <div className="p-4 text-red-600">Error loading data</div>;
  if (!cook) return <div className="p-4">No data found</div>;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" })
      .format(new Date(date));

  // Handlers
  const handleVerifyStatus = async (newStatus) => {
    const approval_status = newStatus === "Verified" ? "approved" : "rejected";
    await verifyCook({ approval_status });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center mb-4 text-gray-600 hover:text-gray-800">
        <ArrowLeft size={18} className="mr-2" /> Back
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center">
          <img src={cook.image} alt={cook.name} className="w-20 h-20 rounded-full object-cover mr-4" />
          <div>
            <h2 className="font-bold text-xl">{cook.name}</h2>
            <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full bg-${statusColor[cook.status]}-100 text-${statusColor[cook.status]}-800`}>
              {cook.status === "Verified" ? <CheckCircle size={14} className="mr-1" /> : <AlertCircle size={14} className="mr-1" />}
              {cook.status}
            </span>
            <div className="text-gray-500 text-sm mt-2 flex items-center">
              <Calendar size={14} className="mr-1" />
              Joined {formatDate(cook.joinedDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <FileText size={18} className="mr-2 text-blue-500" /> Verification Documents
        </h3>
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-2">
          {documentConfig.map((doc) => {
            const imageUrl = cook.documents[doc.modalKey];
            if (!imageUrl) return null;
            return (
              <div key={doc.key} className="border rounded-lg w-48 flex-shrink-0 overflow-hidden">
                <div className="p-2 bg-gray-50 border-b">
                  <p className="text-xs text-gray-500">{doc.label}</p>
                </div>
                <div className="relative group">
                  <img src={imageUrl} alt={doc.label} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button onClick={() => setShowDocumentModal(doc.modalKey)} className="p-2 bg-white rounded-full">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this therapist?</p>
            {deleteError && <div className="mb-4 p-2 bg-red-100 text-red-600">{deleteError.message}</div>}
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowConfirmDelete(false)} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
              <button onClick={deleteCook} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 max-w-3xl w-full">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">
                {documentConfig.find(d => d.modalKey === showDocumentModal)?.label}
              </h3>
              <button onClick={() => setShowDocumentModal(null)} className="text-gray-400 hover:text-gray-500">
                ✕
              </button>
            </div>
            <div className="flex justify-center">
              <img src={cook.documents?.[showDocumentModal]} alt={showDocumentModal} className="max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistProfileDetails;
