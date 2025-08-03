// src/components/auth/LoginForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff, Email, Lock, Info } from "@mui/icons-material";
import { useUserLoginFormik } from "../formik/useUserloginformik";
import { useAuth } from "@/context/AuthContext";

export const LoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // This useEffect handles redirecting a user who is already logged in
  useEffect(() => {
    if (user) {
      // The redirect logic here mirrors the logic in the context's login function
      const { role, doctorInfo } = user;
      if (role.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');
      } else if (doctorInfo) {
        switch (doctorInfo.applicationStatus.toLowerCase()) {
          case 'approved': navigate('/doctor-dashboard'); break;
          case 'rejected': navigate('/application-rejected'); break;
          case 'pending': navigate('/application-review'); break;
          default: navigate('/register-as-therapist'); break;
        }
      } else {
        navigate('/therapist/register-as-therapist');
      }
    }
  }, [user, navigate]);

  const { formik, isLoggingIn } = useUserLoginFormik({
    mutationConfig: {
      onSuccess: (result) => {
        // This is the connection point.
        // It passes the entire API result to the context's login function.
        if (!result || !result.token || !result.user) {
          console.error("❌ Invalid login result structure:", result);
          toast.error("An unexpected login error occurred.", { position: "top-right" });
          return;
        }
        toast.success("✅ Login successful! Welcome back!", { position: "top-right", autoClose: 2000 });
        login(result);
      },
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const renderTextField = (name, label, type, placeholder, Icon) => (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete={name === "password" ? "current-password" : "email"}
          className={`block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm
            ${
              formik.touched[name] && formik.errors[name]
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {name === "password" ? (
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 focus:outline-none">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          ) : (
            <Icon className="text-gray-400" />
          )}
        </div>
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-2 text-sm text-red-600">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full md:w-2/3 mx-auto flex flex-col justify-center"
      noValidate
      autoComplete="off"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-2">
          Welcome Back
        </h1>
        <h2 className="text-lg text-gray-500">
          Sign in to continue your journey
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {renderTextField("email", "Email Address", "email", "Enter your email", Email)}
        {renderTextField("password", "Password", showPassword ? "text" : "password", "Enter your password", Lock)}
      </div>

      <button
        type="submit"
        disabled={isLoggingIn || !formik.isValid || formik.isSubmitting}
        className="w-full py-3 text-lg font-medium mt-6 bg-purple-500 rounded-lg text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
      >
        {isLoggingIn ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </button>

      {formik.errors.submit && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {formik.errors.submit}
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-base text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-purple-700 hover:underline focus:outline-none"
          >
            Register here
          </button>
        </p>
      </div>

      <hr className="my-6" />

      <div className="flex items-start p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-purple-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold text-gray-600">
            Secure Login:
            <span className="font-normal"> Your credentials are encrypted and never shared.</span>
          </p>
        </div>
      </div>
    </form>
  );
};