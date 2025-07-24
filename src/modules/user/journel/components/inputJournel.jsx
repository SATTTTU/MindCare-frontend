import { Sidebar } from "@/components/ui/aside";
import { useJournalFormik } from "../formik/useJournelFormik";

export const JournalComponent = () => {
  const formik = useJournalFormik();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex min-h-screen font-inter">
      <div className="flex min-h-screen bg-slate-50 font-sans">
    <Sidebar />
      </div>
      <div className="flex-grow p-5 flex items-center justify-center">
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-custom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes float-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-spin-custom {
            animation: spin 1s linear infinite;
          }
          .animate-pulse-custom {
            animation: pulse-custom 2s ease-in-out infinite;
          }
          .animate-float-in {
            animation: float-in 0.3s ease-out;
          }
          .glass-morphism {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.9);
          }
        `}</style>

        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-50 to-green-100 rounded-full transform translate-x-16 -translate-y-16 opacity-60"></div>

          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse-custom">
              <span className="text-3xl">✍️</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 leading-tight">
              Today's Journal
            </h1>
            <p className="text-lg text-slate-600 font-medium mb-2">
              {getCurrentDate()}
            </p>
            <p className="text-base text-slate-400">
              {getCurrentTime()}
            </p>
          </div>

          {/* Status Messages */}
          {formik.status?.error && (
            <div className="text-red-500 text-sm text-center mb-4 font-medium">
              {formik.status.message}
            </div>
          )}

          {formik.status?.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-base text-center mb-6 font-semibold p-3 rounded-xl animate-float-in">
              ✨ {formik.status.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="relative z-10">
            <div className="relative mb-6">
              {/* Floating Label */}
              <div className={`absolute -top-3 left-5 bg-white px-2 text-sm font-semibold text-emerald-600 transition-all duration-300 ${
                formik.values.text ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
              }`}>
                Your thoughts
              </div>

              {/* Textarea */}
              <textarea
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="What's on your mind today? How was your day? What are you grateful for? Let your thoughts flow freely..."
                className={`w-full min-h-80 p-6 border-2 rounded-2xl text-lg font-normal resize-none outline-none transition-all duration-300 leading-relaxed bg-slate-50 shadow-inner ${
                  formik.errors.text
                    ? 'border-red-400 focus:border-red-500'
                    : formik.values.text
                      ? 'border-emerald-400 focus:border-emerald-500 bg-white shadow-lg transform -translate-y-1 focus:shadow-xl focus:ring-4 focus:ring-emerald-100'
                      : 'border-slate-200 focus:border-emerald-400 focus:bg-white focus:shadow-lg focus:transform focus:-translate-y-1 focus:ring-4 focus:ring-emerald-100'
                }`}
              />

              {/* Character Count */}
              <div className="absolute bottom-3 right-5 text-sm text-slate-400 font-medium bg-white bg-opacity-90 px-2 py-1 rounded-lg glass-morphism">
                {formik.values.text.length} characters
              </div>

              {/* Error Message */}
              {formik.errors.text && formik.touched.text && (
                <div className="text-red-500 text-sm mt-2 text-center font-medium">
                  {formik.errors.text}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.values.text.trim()}
              className={`w-full sm:w-auto mx-auto flex items-center justify-center px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 min-w-48 relative overflow-hidden ${
                formik.isSubmitting || !formik.values.text.trim()
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 hover:from-emerald-600 hover:to-teal-700 active:transform active:translate-y-0'
              }`}
            >
              {formik.isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin-custom mr-3"></div>
                  Saving your thoughts...
                </>
              ) : (
                <>
                  <span className="mr-2">💾</span>
                  Save Journal Entry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};