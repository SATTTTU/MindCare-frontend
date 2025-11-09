// components/forms/AppointmentForm.jsx
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Calendar, Clock, MessageSquare, CheckCircle, User, Stethoscope } from "lucide-react";
import { useBookAppointment } from "../api/book-appoinment";
import { toast } from "react-toastify"

// Zod validation schema
const AppointmentSchema = z.object({
  userId: z.number().positive("User ID is required"),
  userName: z.string().min(1, "User name is required"),
  doctorId: z.number().positive("Doctor ID is required"),
  doctorName: z.string().min(1, "Doctor name is required"),
  appointmentDateTime: z.string().min(1, "Please select appointment date & time"),
  durationMinutes: z
    .number()
    .min(15, "Minimum 15 minutes")
    .max(180, "Maximum 3 hours")
    .multipleOf(15, "Duration must be in 15-minute intervals"),
  status: z.literal("Pending"),
  userNotes: z.string().max(500, "Notes must be less than 500 characters").optional(),
  doctorNotes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  shareSentimentHistory: z.boolean(),
});

export const AppointmentForm = ({ doctor, user, availableSlots = [], onSuccess, onCancel }) => {
  const { mutate: bookAppointment, isLoading, error } = useBookAppointment();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const now = new Date();
  const minDateTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16); // 1 hour from now

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-blue-600" />
          Book Appointment
        </h2>
        <p className="text-gray-600 mt-2">Schedule your visit with {doctor.name}</p>
      </div>

      {/* Selected Doctor Info */}
      <div className="p-6 bg-blue-50">
        <div className="flex items-center gap-4">
          <img
            src={
              doctor.profileImageUrl?.startsWith("http")
                ? doctor.profileImageUrl
                : `${import.meta.env.VITE_APP_API_URL || ""}${doctor.profileImageUrl}`
            }
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            onError={(e) => (e.target.src = "/assets/default-doctor.png")}
          />
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              {doctor.name}
            </h3>
            <p className="text-blue-600 text-sm font-medium">{doctor.specialization}</p>
            <p className="text-gray-600 text-sm">{doctor.contactInfo || "Healthcare Professional"}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Formik
          initialValues={{
            userId: user?.id || 0,
            userName: user?.name || "",
            doctorId: doctor.id,
            doctorName: doctor.name,
            appointmentDateTime: "",
            durationMinutes: 30,
            status: "Pending",
            userNotes: "",
            doctorNotes: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            shareSentimentHistory: false,
          }}
          validationSchema={toFormikValidationSchema(AppointmentSchema)}
          onSubmit={(values, { resetForm }) => {
            bookAppointment(values, {
              onSuccess: () => {
                if (onSuccess) onSuccess();
                alert("Appointment booked successfully!");
                resetForm();
              },
              onError: (err) => {
                toast.error("Booking error:", err);
                alert(err?.response?.data?.message || "Failed to book appointment. Please try again.");
              },
            });
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <Field
                      type="text"
                      name="userName"
                      placeholder="Enter patient name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Available Time Slots */}
              {availableSlots.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={slot.isBooked}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setFieldValue("appointmentDateTime", slot.startTime);
                        }}
                        className={`p-3 rounded-lg border text-sm transition-all ${slot.isBooked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                            : selectedSlot?.id === slot.id
                              ? "bg-blue-600 text-white border-blue-600 shadow-md"
                              : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                      >
                        <div className="font-medium">
                          {new Date(slot.startTime).toLocaleDateString()}
                        </div>
                        <div className="text-xs">
                          {new Date(slot.startTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual DateTime Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {availableSlots.length > 0 ? "Or Select Custom Time" : "Select Appointment Time"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Date & Time *
                    </label>
                    <Field
                      type="datetime-local"
                      name="appointmentDateTime"
                      min={minDateTime}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="appointmentDateTime"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes) *
                    </label>
                    <Field
                      as="select"
                      name="durationMinutes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => setFieldValue("durationMinutes", parseInt(e.target.value))}
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hours</option>
                      <option value={120}>2 hours</option>
                    </Field>

                    <ErrorMessage
                      name="durationMinutes"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Additional Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit / Notes
                  </label>
                  <Field
                    as="textarea"
                    name="userNotes"
                    rows="4"
                    placeholder="Please describe the reason for your visit or any important information the doctor should know..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <ErrorMessage
                    name="userNotes"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {values.userNotes?.length || 0}/500 characters
                  </div>
                </div>
              </div>

              {/* Consent for Sentiment History */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Field
                    type="checkbox"
                    name="shareSentimentHistory"
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label className="text-sm font-medium text-gray-800">
                      Share my mood/sentiment tracking history with the doctor
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      This information will help your doctor provide better personalized care by understanding
                      your emotional patterns and mental health trends.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">
                    {error?.response?.data?.message || "An error occurred while booking the appointment"}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};