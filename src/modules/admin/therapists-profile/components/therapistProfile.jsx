// File Path: src/components/TherapistProfileDetails.jsx

import React, { useState, useMemo } from 'react';
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  FileText,
  Eye,
  User,
  Phone,
  Mail,
  Award,
  Clock,
  Download,
  X,
  UserCheck,
  UserX,
  RefreshCw
} from 'lucide-react';
import { toast } from "react-toastify";

// Import the hooks for data fetching and mutations
import { usegetDocuments } from "../api/getDocuments";
import { useVerifyTherapist } from "../api/verify-cook";
import { useDeleteTherapist } from "../api/useDeleteTherapist"; // This hook handles rejection
import { useGetAllTherapists } from "../api/useSingleTherapist";

const documentConfig = [
  { key: "PasswordSizedPhoto", label: "Passport Size Photo", icon: User },
  { key: "CitizenshipFront", label: "Citizenship Front", icon: FileText },
  { key: "CitizenshipBack", label: "Citizenship Back", icon: FileText },
  { key: "Certificate", label: "Certificates", icon: Award },
];

// Helper to construct full image URLs
const getFullImageUrl = (path) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path}`;
};

const TherapistProfileDetails = ({ therapistId, navigate, onStatusChange }) => {
  // State for the rejection modal and its inputs
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [rejectionError, setRejectionError] = useState(null);

  // State for the document viewer modal
  const [showDocumentModal, setShowDocumentModal] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Fetching all therapists to find the one we need
  const {
    data: allTherapistsData,
    isLoading: isLoadingTherapists,
    isError: isErrorTherapists,
    error: errorTherapists,
  } = useGetAllTherapists();

  // Memoized derivation of the specific therapist's data
  const therapistData = useMemo(() => {
    return allTherapistsData?.find((t) => t.id == therapistId) || null;
  }, [allTherapistsData, therapistId]);

  // Fetching documents for this therapist
  const {
    data: documentsData,
    isLoading: isLoadingDocs,
    isError: isErrorDocs,
  } = usegetDocuments(therapistId);

  // Memoized derivation of the latest version of each document type
  const latestDocuments = useMemo(() => {
    if (!documentsData) return {};
    const latest = {};
    for (const doc of documentsData) {
      if (!latest[doc.documentType] || doc.id > latest[doc.documentType].id) {
        latest[doc.documentType] = doc;
      }
    }
    return latest;
  }, [documentsData]);

  // Hook for the "Approve" action
  const { mutateAsync: verifyTherapist, isLoading: isVerifying } = useVerifyTherapist(therapistId, {
    onSuccess: () => {
      toast.success("Therapist verified successfully");
      onStatusChange?.(therapistId, "Verified");
    },
    onError: () => toast.error("Failed to verify therapist"),
  });

  // Hook for the "Reject" action
  const { mutateAsync: rejectTherapist, isLoading: isRejecting } = useDeleteTherapist(therapistId, {
    onSuccess: () => {
      toast.success("Therapist rejected successfully");
      setShowConfirmReject(false);
      navigate("/admin/therapists");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to reject therapist");
      setRejectionError(error);
    },
  });

  // Handler for the reject button in the modal
  const handleReject = async () => {
    // Basic validation to ensure a reason is given
    if (!rejectionNote || rejectionNote.trim() === "") {
        toast.warn("A reason for rejection is required.");
        return;
    }
    setRejectionError(null);
    await rejectTherapist({ Notes: rejectionNote });
  };
  
  // Handler for the approve button
  const handleApprove = async () => {
    await verifyTherapist({ approval_status: "approved" });
  };

  // Maps backend status to UI-friendly labels, colors, and icons
  const mapApplicationStatus = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return { label: "Verified", color: "green", icon: CheckCircle };
      case "pending review":
      case "pending":
        return { label: "Pending Review", color: "yellow", icon: Clock };
      case "rejected":
        return { label: "Rejected", color: "red", icon: AlertCircle };
      default:
        return { label: "Under Review", color: "blue", icon: RefreshCw };
    }
  };

  // Opens the modal to view a specific document
  const openDocumentModal = (docType) => {
    const document = latestDocuments[docType];
    if (document) {
      setSelectedDocument(document);
      setShowDocumentModal(docType);
    }
  };

  // Loading state
  if (isLoadingTherapists || isLoadingDocs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading therapist details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isErrorTherapists || isErrorDocs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Error loading data</p>
          <p className="text-gray-500 text-sm mt-2">
            {errorTherapists?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  // No data found state
  if (!therapistData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-8 w-8 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No therapist data found for this ID.</p>
        </div>
      </div>
    );
  }

  const statusInfo = mapApplicationStatus(therapistData.applicationStatus || therapistData.specialization);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium cursor-pointer">Back to Therapists</span>
          </button>

          <div className="flex space-x-3">
            {statusInfo.label !== "Verified" && statusInfo.label !== "Rejected" && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={isVerifying || isRejecting}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  <UserCheck size={16} className="mr-2" />
                  {isVerifying ? "Approving..." : "Approve"}
                </button>
                <button
                  onClick={() => setShowConfirmReject(true)}
                  disabled={isRejecting || isVerifying}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  <UserX size={16} className="mr-2" />
                  Reject
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={getFullImageUrl(latestDocuments.PasswordSizedPhoto?.filePath) || "https://via.placeholder.com/150"}
                    alt={therapistData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-${statusInfo.color}-100 border-2 border-white flex items-center justify-center`}>
                    <StatusIcon size={14} className={`text-${statusInfo.color}-600`} />
                  </div>
                </div>

                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  {therapistData.name || "N/A"}
                </h1>

                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800 mb-4`}>
                  {statusInfo.label}
                </span>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <Award size={16} className="mr-2 text-blue-500" />
                    <span>{therapistData.specialization || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Phone size={16} className="mr-2 text-green-500" />
                    <span>{therapistData.contactInfo || "N/A"}</span>
                  </div>
                  {therapistData.email && (
                    <div className="flex items-center justify-center">
                      <Mail size={16} className="mr-2 text-purple-500" />
                      <span>{therapistData.email}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center">
                    <Calendar size={16} className="mr-2 text-orange-500" />
                    <span>User ID: {therapistData.userId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText size={20} className="mr-2 text-blue-500" />
                  Verification Documents
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Review and manage submitted documents
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentConfig.map((docConfig) => {
                    const document = latestDocuments[docConfig.key];
                    const DocIcon = docConfig.icon;

                    return (
                      <div
                        key={docConfig.key}
                        className={`relative group border-2 rounded-lg overflow-hidden transition-all ${
                          document
                            ? document.status === 'Approved'
                              ? 'border-green-200 bg-green-50'
                              : 'border-yellow-200 bg-yellow-50'
                            : 'border-gray-200 bg-gray-50 border-dashed'
                        }`}
                      >
                        {document ? (
                          <>
                            <div className="aspect-video relative overflow-hidden ">
                              <img
                                src={getFullImageUrl(document.filePath)}
                                alt={docConfig.label}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                                  <button
                                    onClick={() => openDocumentModal(docConfig.key)}
                                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                                  >
                                    <Eye size={16} className="text-gray-700" />
                                  </button>
                                  <button
                                    onClick={() => window.open(getFullImageUrl(document.filePath), '_blank')}
                                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                                  >
                                    <Download size={16} className="text-gray-700" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <DocIcon size={16} className="mr-2 text-gray-600" />
                                  <span className="font-medium text-sm text-gray-900">
                                    {docConfig.label}
                                  </span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  document.status === 'Approved'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {document.status || 'Pending'}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploaded by: {document.doctorName}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="aspect-video flex flex-col items-center justify-center p-4">
                            <DocIcon size={32} className="text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 text-center">
                              {docConfig.label}
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              Not uploaded
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rejection Confirmation Modal */}
        {showConfirmReject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <AlertCircle size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Confirm Rejection</h3>
                    <p className="text-sm text-gray-600">This will update the therapist's status to 'Rejected'.</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">Are you sure you want to reject <strong>{therapistData.name}</strong>?</p>
                <div className="mb-4">
                  <label htmlFor="reject-note" className="block text-sm font-medium text-gray-700 mb-1">Reason for rejection <span className="text-red-500">*</span></label>
                  <textarea
                    id="reject-note"
                    rows={3}
                    value={rejectionNote}
                    onChange={(e) => setRejectionNote(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide a reason for rejecting this therapist..."
                  />
                </div>
                {rejectionError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{rejectionError.message || "An error occurred"}</div>
                )}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowConfirmReject(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isRejecting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    {isRejecting ? "Rejecting..." : "Reject Therapist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document View Modal */}
        {showDocumentModal && selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {documentConfig.find(d => d.key === showDocumentModal)?.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Status: {selectedDocument.status || 'Pending'} | Uploaded by: {selectedDocument.doctorName}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDocumentModal(null);
                    setSelectedDocument(null);
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-auto p-4">
                <img
                  src={getFullImageUrl(selectedDocument.filePath)}
                  alt={selectedDocument.documentType}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistProfileDetails;