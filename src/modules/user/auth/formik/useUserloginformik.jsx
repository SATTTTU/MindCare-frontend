// src/formik/useUserLoginFormik.js
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "./schema/authSchema";
import { useUserLogin } from "../api/login";

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
        helpers.setStatus({ success: true, message: "Login successful" });
        helpers.resetForm();

        toast.success("✅ Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Store the user's ID in localStorage
        if (result && result.user && result.user.id) {
          localStorage.setItem("userId", result.user.id);
        }

        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Login error:", err);

        const errorMessage =
          err instanceof AxiosError && err.response
            ? err.response.data?.message || "An unexpected error occurred."
            : "Network error. Please check your connection.";

        const errorStatus = err instanceof AxiosError ? err.response?.status : null;

        if (errorStatus === 401) {
          helpers.setErrors({ submit: "Invalid email or password." });
          toast.error("❌ Invalid credentials. Please try again!", { position: "top-right" });
        } else {
          helpers.setErrors({ submit: errorMessage });
          toast.error(`⚠️ ${errorMessage}`, { position: "top-right" });
        }

        if (config?.mutationConfig?.onError) {
          config.mutationConfig.onError(err);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return { formik, isLoggingIn };
};