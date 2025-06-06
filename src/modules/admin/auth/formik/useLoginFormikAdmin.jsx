import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAdminLogin } from "../api/login";
import { adminLoginSchema } from "./authSchema";

export const useAdminLoginFormik = (config = {}) => {
  const { mutateAsync, isLoading: isLoggingIn } = useAdminLogin({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(adminLoginSchema),
    validateOnBlur: true,
    validateOnChange: true, // <-- Change here: validate on change for better feedback
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: "Login successful" });
        helpers.resetForm();

        toast.success("✅ Login successful! Welcome back!", {
          position: "top-right",
          autoClose: 3000,
        });

        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Login error:", err);

        if (err instanceof AxiosError && err.response) {
          const status = err.response?.status;
          const message = err.response?.data?.message || "Login failed";

          if (status === 401) {
            helpers.setErrors({ submit: "Invalid email or password." });
            toast.error("❌ Invalid credentials. Please try again!", {
              position: "top-right",
              autoClose: 3000,
            });
          } else {
            helpers.setErrors({ submit: message });
            toast.error(`⚠️ ${message}`, {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else {
          helpers.setErrors({ submit: "Network error. Please try again later." });
          toast.error("❌ Connection error. Check your internet!", {
            position: "top-right",
            autoClose: 4000,
          });
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
