// src/formik/useUserLoginFormik.js
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "./schema/authSchema"; // Ensure path is correct
import { useUserLogin } from "../api/login"; // Ensure path is correct

export const useUserLoginFormik = (config = {}) => {
  const { mutateAsync, isLoading: isLoggingIn } = useUserLogin({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        
        // Its only job is to call the onSuccess function passed to it.
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }

        helpers.resetForm();

      } catch (err) {
        console.error("Login error:", err);
        const errorMessage =
          err instanceof AxiosError && err.response
            ? err.response.data?.message || "An unexpected error occurred."
            : "Network error. Please check your connection.";

        if (err.response?.status === 401) {
          helpers.setErrors({ submit: "Invalid email or password." });
          toast.error("❌ Invalid credentials. Please try again.", { position: "top-right" });
        } else {
          helpers.setErrors({ submit: errorMessage });
          toast.error(`⚠️ ${errorMessage}`, { position: "top-right" });
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isLoggingIn };
};