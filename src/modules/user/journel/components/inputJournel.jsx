import React from 'react';
import { useJournalFormik } from '../formik/useJournelFormik';

export const JournalComponent = ({ onSubmissionSuccess }) => {
  const formik = useJournalFormik({ onSubmissionSuccess });

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-6">
        {/* Header */}
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">✍️</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Today's Journal
            </h2>
            <p className="text-md text-slate-500 mt-1">{getCurrentDate()}</p>
        </div>

        {/* Status Messages */}
        {formik.status?.message && (
            <div className={`text-center mb-4 p-3 rounded-lg font-semibold ${formik.status.error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                {formik.status.message}
            </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
            <div className="relative mb-6">
                <textarea
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="What's on your mind today? Let your thoughts flow..."
                    className={`w-full min-h-60 p-5 border-2 rounded-xl text-lg resize-none outline-none transition-all duration-300 bg-slate-50 shadow-inner ${
                        formik.errors.text && formik.touched.text
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                    }`}
                />
                <div className="absolute bottom-4 right-5 text-sm text-slate-400 font-medium">
                    {formik.values.text.length} characters
                </div>
            </div>
            {formik.errors.text && formik.touched.text && (
                <div className="text-red-500 text-sm mb-4 text-center font-medium">
                    {formik.errors.text}
                </div>
            )}

            <div className="text-center">
                <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.values.text.trim()}
                    className="px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 min-w-48 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:shadow-lg hover:-translate-y-1 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {formik.isSubmitting ? 'Saving...' : 'Save Journal Entry'}
                </button>
            </div>
        </form>
    </div>
  );
};