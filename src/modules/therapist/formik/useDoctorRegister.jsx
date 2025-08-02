// formik/useDoctorRegisterFormik.js
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { profileSchema } from "./schema/documentSchema";
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
        const result = await mutateAsync(values);

        toast.success("✅ Doctor registered successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        helpers.resetForm();
        config?.mutationConfig?.onSuccess?.(result);
      } catch (err) {
        console.error("Registration error:", err);

        if (err instanceof AxiosError && err.response) {
          const message = err.response?.data?.message || "Submission failed";
          helpers.setErrors({ submit: message });
          toast.error("❌ " + message);
        } else {
          helpers.setErrors({ submit: "Unexpected error occurred" });
          toast.error("⚠️ Please try again later.");
        }

        config?.mutationConfig?.onError?.(err);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isRegistering };
};
