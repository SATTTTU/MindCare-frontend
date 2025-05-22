import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useUserRegister } from "../api/registerapi";
import { signUpSchema } from "./schema/authSchema";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const useUserRegisterFormik = (config = {}) => {
  const { mutateAsync, isLoading: isRegistering } = useUserRegister({
    mutationConfig: config?.mutationConfig,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const result = await mutateAsync(values);
        helpers.setStatus({ success: true, message: "Registration successful" });
        helpers.resetForm();
        
        toast.success("🎉 Registration successful! Welcome to our community!", {
          position: "top-right",
          autoClose: 4000,
        });
        
        console.log("Registration successful:", result);
        
        if (config?.mutationConfig?.onSuccess) {
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Registration error:", err);
        
        if (err instanceof AxiosError && err.response) {
          const status = err.response?.status;
          const message = err.response?.data?.message || "Registration failed";
          
          if (status === 422) {
            const serverErrors = err.response?.data?.errors;
            if (serverErrors?.email) {
              toast.error("📧 This email is already registered. Try another one!", {
                position: "top-right",
                autoClose: 4000,
              });
            } else {
              helpers.setErrors(serverErrors || { submit: message });
              toast.error(`⚠️ ${message}`, {
                position: "top-right",
                autoClose: 3000,
              });
            }
          } else if (status === 400) {
            helpers.setErrors({ submit: "Invalid registration data. Please check your information." });
            toast.error("📝 Please check your information and try again!", {
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
          toast.error("❌ Connection error. Please check your internet and try again!", {
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

  return { formik, isRegistering };
};