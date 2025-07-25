import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSaveJournal } from "../api/saveJournel";
import { journalValidationSchema } from "./schema/journelschema";

/**
 * A custom hook to manage the state and submission logic for the journal form.
 *
 * It integrates:
 * - Formik for form state management.
 * - Zod for powerful, declarative validation.
 * - TanStack Query (`useSaveJournal`) for handling the API mutation.
 */
export const useJournalFormik = () => {
  // Get the mutation function and its state from the TanStack Query hook.
  const { mutateAsync, isPending } = useSaveJournal();

  const formik = useFormik({
    // Define the initial shape of the form data.
    initialValues: {
      text: "",
      date: new Date().toISOString().split("T")[0], // Set today's date by default
    },

    // Bridge Zod schema to Formik for validation.
    validationSchema: toFormikValidationSchema(journalValidationSchema),

    // Define the action to take when the form is submitted.
    onSubmit: async (values, { setStatus, resetForm, setSubmitting }) => {
      setStatus(undefined); // Clear previous status messages.

      try {
        // Call the API mutation. `mutateAsync` will throw an error on failure.
        await mutateAsync(values);

        // On success, set a success message to be displayed in the UI.
        setStatus({
          success: true,
          message: "Your journal entry has been saved successfully!",
        });
        
        // Clear the form fields for the next entry.
        resetForm();

      } catch (error) {
        // On failure, set an error message from the API.
        setStatus({
          success: false,
          message: error.message || "Something went wrong. Please try again.",
        });
      } finally {
        // Ensure the form's submitting state is set to false after the operation.
        setSubmitting(false);
      }
    },
  });

  // Return the complete formik instance, but override `isSubmitting`
  // with the loading state from TanStack Query for a single source of truth.
  return {
    ...formik,
    isSubmitting: isPending,
  };
};