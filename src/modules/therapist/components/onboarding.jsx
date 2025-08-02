// components/DoctorDetailsStep.jsx
import React from "react";
import { Field, ErrorMessage } from "formik";

const DoctorDetailsStep = ({ formik }) => {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Doctor Details</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <Field
          type="text"
          name="name"
          placeholder="Enter name"
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Specialization <span className="text-red-500">*</span>
        </label>
        <Field
          type="text"
          name="specialization"
          placeholder="Enter specialization"
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        <ErrorMessage
          name="specialization"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Contact Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Info <span className="text-red-500">*</span>
        </label>
        <Field
          type="text"
          name="contactInfo"
          placeholder="Enter phone/email"
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
        <ErrorMessage
          name="contactInfo"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        {formik.isSubmitting ? "Submitting..." : "Register Doctor"}
      </button>
    </div>
  );
};

export default DoctorDetailsStep;
