// components/DoctorForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorRegisterFormik } from "../formik/useDoctorRegister";

export const DoctorForm = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const { formik, isRegistering } = useDoctorRegisterFormik({
    mutationConfig: {
      onSuccess: () => {
        setTimeout(() => navigate("/become-therapist"), 2000);
      },
      onError: (error) => {
        console.error("Doctor registration failed:", error);
      },
    },
  });

  const renderInput = (name, label, placeholder) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-sm
          ${formik.touched[name] && formik.errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-green-500"
          }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-sm text-red-600 mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-green-700">Doctor Registration</h2>

      {renderInput("name", "Full Name", "Dr. Jane Doe")}
      {renderInput("specialization", "Specialization", "Cardiology, Pediatrics, etc.")}
      {renderInput("contactInfo", "Contact Info", "Phone or Email")}

      <div className="flex items-start">
        <input
          id="agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 mt-1 text-green-600 border-gray-300 rounded"
        />
        <label htmlFor="agree" className="ml-2 text-sm text-gray-600">
          I confirm that the information provided is accurate.
        </label>
      </div>

      <button
        type="submit"
        disabled={isRegistering || !formik.isValid || formik.isSubmitting || !agree}
        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
      >
        {isRegistering ? "Registering..." : "Register Doctor"}
      </button>

      {formik.errors.submit && (
        <div className="text-sm mt-4 text-red-600 bg-red-50 border border-red-200 p-3 rounded">
          {formik.errors.submit}
        </div>
      )}
    </form>
  );
};
