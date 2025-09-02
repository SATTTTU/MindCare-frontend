// src/modules/therapist/formik/useDoctorDocumentFormik.js (Renamed file)
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { documentSchema } from "./schema/documentSchema";
import { useDocumentRegister } from "../api/useregisterTherapistDoc";

export const useDoctorDocumentFormik = (config = {}) => {
  const { mutateAsync, isLoading: isRegistering } = useDocumentRegister({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      passwordsizedphoto: null,
      citizenshipFront: null,
      citizenshipBack: null,
      certificates: [],
      experienceLetters: '',
      termsAccepted: false,
    },
    validationSchema: toFormikValidationSchema(documentSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();

        // **FIX 1: Use the doctorId passed from the parent component**
        if (config.doctorId) {
          formData.append("DoctorId", config.doctorId);
        } else {
          toast.error("⚠️ Doctor ID is missing. Cannot upload documents.");
          helpers.setErrors({ submit: "Doctor ID is missing. Please restart the registration." });
          return;
        }

        // **FIX 2: Match FormData keys with the backend DTO properties (PascalCase)**
        if (values.passwordsizedphoto) formData.append("PasswordSizedPhoto", values.passwordsizedphoto);
        if (values.citizenshipFront) formData.append("CitizenshipFront", values.citizenshipFront);
        if (values.citizenshipBack) formData.append("CitizenshipBack", values.citizenshipBack);
        
        if (values.certificates && values.certificates.length > 0) {
            values.certificates.forEach((file) => {
                formData.append(`Certificates`, file); // Backend should handle multiple files with the same key
            });
        }
        if (values.experienceLetters) formData.append("ExperienceLetters", values.experienceLetters);

        formData.append("HasAcceptedTerms", values.termsAccepted);
        
        const result = await mutateAsync(formData);

        toast.success("🎉 Documents submitted successfully and are now under review!");
        helpers.resetForm();

        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }

      } catch (err) {
        console.error("Document submission error:", err);
        const message = err.response?.data?.message || "An unexpected error occurred.";
        helpers.setErrors({ submit: message });
        toast.error(`❌ ${message}`);
        
        if (config?.mutationConfig?.onError) {
          config.mutationConfig.onError(err);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isRegistering };
};