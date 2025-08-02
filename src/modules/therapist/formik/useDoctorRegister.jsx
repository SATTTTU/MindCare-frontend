// src/routes/therapists/formik/useDoctorRegisterFormik.js
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { profileSchema } from "./schema/documentSchema"; // Assuming your schema is here
import { useDoctorRegister } from "../api/therapistRegister";

export const useDoctorRegisterFormik = (config = {}) => {
  const { mutateAsync, isLoading: isRegistering } = useDoctorRegister({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      specialization: "",
      contactInfo: "",
    },
    validationSchema: toFormikValidationSchema(profileSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        // The API hook now returns the data directly
        const result = await mutateAsync(values);

        toast.success("✅ Profile created successfully! Please upload your documents.", {
          position: "top-right",
          autoClose: 2000,
        });
        
        // This is the key: call the parent's onSuccess with the result from the API
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }

      } catch (err) {
        console.error("Registration error:", err);
        const message = err.response?.data?.message || "Submission failed";
        helpers.setErrors({ submit: message });
        toast.error("❌ " + message);

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