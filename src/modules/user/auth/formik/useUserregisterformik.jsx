import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useUserRegister } from "../api/registerapi";
import { signUpSchema } from "./schema/authSchema";
import { toFormikValidationSchema } from "zod-formik-adapter";

console.log("useUserRegisterFormik hook is loading"); // Debug 1

export const useUserRegisterFormik = (config = {}) => {
  console.log("useUserRegisterFormik function is executing with config:", config); // Debug 2

  const { mutateAsync, isLoading: isRegistering } = useUserRegister({
    mutationConfig: config?.mutationConfig,
  });

  console.log("useUserRegister hook returned:", { mutateAsync, isRegistering }); // Debug 3

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
      console.log("Formik onSubmit triggered with values:", values); // Debug 4
      try {
        console.log("Attempting to register user..."); // Debug 5
        const result = await mutateAsync(values);
        console.log("Registration API response:", result); // Debug 6
        
        helpers.setStatus({ success: true, message: "Registration successful" });
        helpers.resetForm();
        
        toast.success("🎉 Registration successful! Welcome to our community!", {
          position: "top-right",
          autoClose: 4000,
        });
        
        if (config?.mutationConfig?.onSuccess) {
          console.log("Calling onSuccess callback"); // Debug 7
          config.mutationConfig.onSuccess(result);
        }
      } catch (err) {
        console.error("Registration error caught:", err); // Debug 8
        
        if (err instanceof AxiosError && err.response) {
          const status = err.response?.status;
          const message = err.response?.data?.message || "Registration failed";
          
          console.log("Axios error details:", { status, message }); // Debug 9
          
          if (status === 422) {
            const serverErrors = err.response?.data?.errors;
            console.log("Validation errors:", serverErrors); // Debug 10
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
          console.log("Non-Axios error:", err); // Debug 11
          helpers.setErrors({ submit: "Network error. Please try again later." });
          toast.error("❌ Connection error. Please check your internet and try again!", {
            position: "top-right",
            autoClose: 4000,
          });
        }
        
        if (config?.mutationConfig?.onError) {
          console.log("Calling onError callback"); // Debug 12
          config.mutationConfig.onError(err);
        }
      } finally {
        console.log("Form submission complete"); // Debug 13
        helpers.setSubmitting(false);
      }
    },
  });

  console.log("Formik instance created:", { 
    values: formik.values, 
    errors: formik.errors,
    isValid: formik.isValid,
    isSubmitting: formik.isSubmitting
  }); // Debug 14

  return { formik, isRegistering };
};