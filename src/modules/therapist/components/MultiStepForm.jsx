// src/modules/therapist/components/MultiStepForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Stepper from "./stepper";
import { ChevronRight } from "lucide-react";
import { CitizenshipUploadStep } from "./citizenshipUpload";
import CertificatesStep from "./certificates";
import TermsStep from "./termscond";
import { useDoctorDocumentFormik } from "../formik/useDocumentUpload";

export const MultiStepForm = ({ doctorId }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // *** FIX: Add state for userData ***
  const [userData, setUserData] = useState(null);

  // *** FIX: Add useEffect to load userData from localStorage ***
  useEffect(() => {
    // This effect runs once to get user display info from storage.
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
      }
    }
  }, []); // Empty dependency array ensures it runs only once on mount.

  const { formik, isRegistering } = useDoctorDocumentFormik({
    doctorId: doctorId,
    mutationConfig: {
      onSuccess: () => {
        navigate("/application-review");
      },
      onError: (error) => {
        console.error("❌ Documents submission failed:", error);
      },
    },
  });

  const validateStep = (step) => {
    switch (step) {
      case 1:
        // Trigger validation for the first step fields
        formik.setFieldTouched("passwordsizedphoto", true);
        formik.setFieldTouched("citizenshipFront", true);
        formik.setFieldTouched("citizenshipBack", true);
        
        // Return true if all required fields for this step are valid and filled
        return (
          formik.values.passwordsizedphoto &&
          formik.values.citizenshipFront &&
          formik.values.citizenshipBack &&
          !formik.errors.passwordsizedphoto &&
          !formik.errors.citizenshipFront &&
          !formik.errors.citizenshipBack
        );
      case 2:
        return true; // No validation for certificates step
      case 3:
        formik.setFieldTouched("termsAccepted", true);
        return formik.values.termsAccepted && !formik.errors.termsAccepted;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      // If validation fails, manually trigger validation to show errors
      formik.validateForm();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const isLastStep = currentStep === 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      formik.handleSubmit(e);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CitizenshipUploadStep formik={formik} />;
      case 2:
        return <CertificatesStep formik={formik} />;
      case 3:
        // Pass userData to the TermsStep component
        return <TermsStep formik={formik} userData={userData} />;
      default:
        return null;
    }
  };

  if (!doctorId) {
    return (
      <div className="w-3/4 mx-auto p-6 pt-10 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold text-red-600">Error: Missing Information</h2>
        <p className="mt-2 text-gray-700">
          The Doctor ID was not found. Please start the registration process from the beginning.
        </p>
        <button
          onClick={() => navigate("/therapist/register-as-therapist")}
          className="mt-4 px-4 py-2 bg-[#426B1F] text-white rounded hover:bg-[#3b5f1d]"
        >
          Go to Registration
        </button>
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto p-6 pt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Upload Your Documents - Step 2</h2>
      <ToastContainer />
      <Stepper
        currentStep={currentStep}
        steps={["Identity", "Certificates", "Terms & Conditions"]}
      />

      {/* This block will now work correctly */}
      {userData && (
        <div className="mb-4 p-3 bg-green-50 rounded-md">
          <h3 className="font-medium text-green-800">
            Welcome, {userData?.name}
          </h3>
          <p className="text-sm text-green-700">Email: {userData.email}</p>
        </div>
      )}

      {/* Changed to use handleNext for all non-last steps */}
      <form onSubmit={isLastStep ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="mt-8">
        {renderStep()}

        {formik.errors.submit && (
          <div className="text-red-500 mt-4">{formik.errors.submit}</div>
        )}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              disabled={isRegistering}
            >
              Back
            </button>
          )}

          {isLastStep ? (
            <button
              type="submit"
              className={`px-4 py-2 rounded flex items-center transition-colors duration-200 ${
                isRegistering || !formik.values.termsAccepted
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#426B1F] text-white hover:bg-[#3b5f1d]"
              }`}
              disabled={isRegistering || !formik.values.termsAccepted}
            >
              {isRegistering ? "Submitting..." : "Submit Application"}
            </button>
          ) : (
            <button
              type="submit" // This now triggers handleNext via the form's onSubmit
              className="px-4 py-2 bg-[#426B1F] text-white rounded hover:bg-[#3b5f1d] flex items-center"
              disabled={isRegistering}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};