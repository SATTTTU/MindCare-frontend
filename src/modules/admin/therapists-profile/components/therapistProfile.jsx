"use client";

import {
  Calendar,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  DollarSign,
  Trash2,
  ArrowLeft,
  MapPin,
  Briefcase,
  Award,
  Star,
  FileText,
  Eye,
  ExternalLink,
} from "react-feather";
import { useState, useMemo } from "react";
import { useGetSingleCook } from "../api/get-single-cook";
import { useVerifyCook } from "../api/verify-cook";
import { useDeleteCook } from "../api/deleteCook";
import { toast } from "react-toastify";
import { usegetPerformance } from "../api/get-cook_performance";

// Helper function to get the full, absolute URL for a file path
const getFullImageUrl = (path) => {
  const baseUrl = import.meta.env.VITE_BUCKET_URL; // Base URL from environment variables
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${baseUrl}${path}`;
};

// Configuration for rendering documents to make the component scalable and maintainable
const documentConfig = [
  { key: "PasswordSizedPhoto", label: "Passport Size Photo", modalKey: "passportPhoto" },
  { key: "CitizenshipFront", label: "Citizenship Front", modalKey: "citizenshipFront" },
  { key: "CitizenshipBack", label: "Citizenship Back", modalKey: "citizenshipBack" },
  { key: "Certificate", label: "Certificates", modalKey: "cookingCertificate" },
];

const CookProfileDetails = ({ cookId, navigate, onStatusChange }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(null);

  // API data fetching hooks
  const { isError, isLoading, data: cookData } = useGetSingleCook(cookId);
  const { data: performanceData } = usegetPerformance(cookId);

  // OPTIMIZATION: Process the document array to find the latest version of each document type.
  // useMemo prevents this logic from re-running on every render.
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

  // API mutation hooks
  const { mutateAsync: verifyCook, isLoading: isVerifying, error: verifyError } = useVerifyCook(cookId, {
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Cook verified successfully:", data);
        onStatusChange?.(cookId, "Verified");
      },
      onError: (error) => console.error("Failed to verify cook:", error),
    },
  });

  const { mutateAsync: deleteCook, isLoading: isDeleting, error: deleteError } = useDeleteCook(cookId, {
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Cook deleted successfully:", data);
        setShowConfirmDelete(false);
        navigate("/admin/cookDetails");
      },
      onError: (error) => console.error("Failed to delete cook:", error),
    },
  });

  // Map the raw API data and processed documents into a clean, structured object for rendering.
  const cook = useMemo(() => {
    if (!cookData) return null;

    // Map the latest documents to the structure expected by the component's state
    const mappedDocs = documentConfig.reduce((acc, doc) => {
      const docData = latestDocuments[doc.key];
      acc[doc.modalKey] = getFullImageUrl(docData?.filePath);
      return acc;
    }, {});

    return {
      id: cookData?.id || cookId || "unknown",
      name: cookData?.name || "Unknown Cook",
      email: cookData?.email || "Email not available",
      phone: cookData?.phone || "Phone not available",
      // Use the latest passport photo as the main profile image
      image: getFullImageUrl(latestDocuments.PasswordSizedPhoto?.filePath) || "https://i.pinimg.com/236x/2a/80/ea/2a80ea63bdda2062c36f951f0c8dcc13.jpg",
      status: cookData?.approval_status ? mapApprovalStatusToDisplay(cookData.approval_status) : "Unknown",
      averageRating: cookData?.average_rating || 0,
      totalReviews: cookData?.total_reviews || 0,
      joinedDate: cookData?.joined_date || new Date().toISOString(),
      address: cookData?.address || "Address not provided",
      experience: cookData?.cook_documents?.past_experience || "Experience not provided",
      specialties: cookData?.specialties || [],
      earnings: cookData?.earnings || { total: 0, monthly: 0 },
      productsSold: cookData?.products_sold || 0,
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

  // --- Render States ---
  if (isLoading) return <div className="p-4 flex items-center justify-center">Loading cook details...</div>;
  if (isError) return <div className="p-4 bg-red-100 text-red-600 rounded">Error loading cook data: {isError.message}</div>;
  if (!cook) return <div className="p-4 bg-yellow-100 text-yellow-800 rounded">No cook data provided.</div>;

  // --- Event Handlers ---
  const handleDeleteCook = async () => {
    try {
      await deleteCook();
    } catch (error) {
      console.error("Error in handleDeleteCook:", error);
      setShowConfirmDelete(false);
    }
  };

  const handleProvideMoney = () => toast.success("Money provided to cook successfully!");

  const handleVerifyStatus = async (newStatus) => {
    toast.info(`Changing status to ${newStatus}...`);
    try {
      const approval_status = newStatus === "Verified" ? "approved" : "rejected";
      await verifyCook({ approval_status });
      onStatusChange?.(cook.id, newStatus);
    } catch (error) {
      console.error(`Error changing status to ${newStatus}:`, error);
    }
  };

  const formatDate = (dateString) => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(dateString));

  const statusColor = { Verified: "green", Pending: "yellow", Unverified: "red" };

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
        <ArrowLeft size={18} className="mr-2" /> Back to Cooks details
      </button>

      {/* --- Profile Header with Actions --- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center">
                    <img
                        src={cook.image}
                        alt={cook.name}
                        className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-gray-200"
                    />
                    <div>
                        <h2 className="font-bold text-xl text-gray-800">{cook.name}</h2>
                        <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColor[cook.status]}-100 text-${statusColor[cook.status]}-800`}>
                                {cook.status === "Verified" ? <CheckCircle size={14} className="mr-1" /> : <AlertCircle size={14} className="mr-1" />}
                                {cook.status}
                            </span>
                        </div>
                        <div className="flex items-center mt-2 text-gray-500 text-sm">
                            <Calendar size={14} className="mr-1" />
                            <span>Joined {formatDate(cook.joinedDate)}</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>

      {/* --- Earnings & Performance Section --- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                <DollarSign size={18} className="mr-2 text-blue-500" /> Earnings & Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg"><p className="text-xs text-gray-500">Total Earnings</p><p className="text-lg font-semibold text-gray-800">Rs {performanceData?.data?.totalEarnings || 0}</p></div>
                <div className="p-4 bg-green-50 rounded-lg"><p className="text-xs text-gray-500">Weekly Earnings</p><p className="text-lg font-semibold text-gray-800">Rs {performanceData?.data?.weeklyEarnings || 0}</p></div>
                <div className="p-4 bg-purple-50 rounded-lg"><p className="text-xs text-gray-500">Completed Orders</p><p className="text-lg font-semibold text-gray-800">{performanceData?.data?.totalCompletedOrders || 0}</p></div>
                <div className="p-4 bg-yellow-50 rounded-lg"><p className="text-xs text-gray-500">Pending Payouts</p><p className="text-lg font-semibold text-gray-800">{performanceData?.data?.pendingPayouts || 0}</p></div>
            </div>
        </div>
      </div>

      {/* --- OPTIMIZED: Verification Documents Section --- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <FileText size={18} className="mr-2 text-blue-500" /> Verification Documents
          </h3>
          <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-2">
            {documentConfig.map((doc) => {
              const imageUrl = cook.documents[doc.modalKey];
              if (!imageUrl) return null; // Don't render a card if the document doesn't exist

              return (
                <div key={doc.key} className="border rounded-lg overflow-hidden w-48 flex-shrink-0">
                  <div className="p-2 bg-gray-50 border-b">
                    <p className="text-xs text-gray-500 truncate">{doc.label}</p>
                  </div>
                  <div className="relative group">
                    <img src={imageUrl} alt={doc.label} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button onClick={() => setShowDocumentModal(doc.modalKey)} className="p-2 bg-white rounded-full">
                        <Eye size={18} className="text-gray-800" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this cook? This action cannot be undone.</p>
            {deleteError && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">Error: {deleteError.message}</div>}
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowConfirmDelete(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Cancel</button>
              <button onClick={handleDeleteCook} disabled={isDeleting} className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${isDeleting ? "opacity-70 cursor-not-allowed" : ""}`}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Document Viewer Modal --- */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                  {documentConfig.find(d => d.modalKey === showDocumentModal)?.label}
              </h3>
              <button onClick={() => setShowDocumentModal(null)} className="text-gray-400 hover:text-gray-500">
                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex justify-center">
              <img src={cook.documents?.[showDocumentModal] || "/placeholder.svg"} alt={showDocumentModal} className="max-h-[80vh] object-contain"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookProfileDetails;