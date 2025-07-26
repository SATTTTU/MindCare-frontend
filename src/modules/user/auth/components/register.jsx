// src/components/auth/RegisterForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  CheckCircle,
  Info,
} from "@mui/icons-material";
import { useUserRegisterFormik } from "../formik/useUserregisterformik";

const passwordRequirements = [
  "At least one uppercase letter (A-Z)",
  "At least one number (0-9)",
  "At least one special character (!@#$%^&*)",
];

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { formik, isRegistering } = useUserRegisterFormik({
    mutationConfig: {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        setTimeout(() => navigate("/login"), 2000);
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
    },
  });

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
          className={`block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm
            ${
              formik.touched[name] && formik.errors[name]
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-green-500 focus:border-green-500"
            }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {name === "password" ? (
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-400">
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
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-green-700 mb-2">
          Join Our Community
        </h1>
        <p className="text-lg text-gray-500">
          Start your journey to better mental wellness
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {renderTextField("name", "Full Name", "text", "Enter your full name", Person)}
        {renderTextField("email", "Email Address", "email", "Enter your email address", Email)}
        {renderTextField("password", "Password", showPassword ? "text" : "password", "Create a strong password", Lock)}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Lock style={{ fontSize: '1rem' }} />
            Password Requirements:
          </h3>
          <div className="pl-5">
            {passwordRequirements.map((req, i) => (
              <p key={i} className="flex items-center text-xs text-blue-800 mb-1">
                <CheckCircle className="text-green-600 mr-2" style={{ fontSize: '0.75rem' }} />
                {req}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-gray-500">
            I agree to the{" "}
            <button type="button" onClick={() => navigate("/register/terms")} className="font-medium text-green-700 hover:underline focus:outline-none">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" onClick={() => navigate("/register/policy")} className="font-medium text-green-700 hover:underline focus:outline-none">
              Privacy Policy
            </button>
            . I understand that my data will be handled securely and confidentially.
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isRegistering || !formik.isValid || formik.isSubmitting || !agreeTerms}
        className="w-full py-3 text-lg font-medium mt-6 bg-green-700 rounded-lg text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-200 disabled:text-gray-400"
      >
        {isRegistering ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </button>

      {formik.errors.submit && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {formik.errors.submit}
        </div>
      )}

      <div className="text-center mt-6">
        <p className="text-base text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-green-700 hover:underline focus:outline-none"
          >
            Sign in here
          </button>
        </p>
      </div>

      <hr className="my-6" />

      <div className="flex items-start p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-green-600" />
        </div>
        <div className="ml-3">
          <p className="text-sm">
            <strong className="font-bold">Your privacy matters.</strong> All information is encrypted and confidential. We're here to support your mental wellness journey in a safe, secure environment.
          </p>
        </div>
      </div>
    </form>
  );
};