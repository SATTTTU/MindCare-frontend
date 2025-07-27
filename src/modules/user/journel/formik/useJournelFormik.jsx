import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSaveJournal } from "../api/saveJournel"; // Ensure this path is correct
import { journalValidationSchema } from "./schema/journelschema"; // Ensure this path is correct

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
  // We use `isPending` for the loading state, which is the current standard in TanStack Query v5.
  const { mutateAsync, isPending, status: mutationStatus } = useSaveJournal();

  const formik = useFormik({
    // Define the initial shape of the form data.
    initialValues: {
      text: "",
      // The date field from your schema is included, defaulting to today.
      date: new Date().toISOString().split("T")[0], 
    },

    // Bridge Zod schema to Formik for validation.
    validationSchema: toFormikValidationSchema(journalValidationSchema),

    // Define the action to take when the form is submitted.
    onSubmit: async (values, { setStatus, resetForm }) => {
      // Clear previous status messages.
      setStatus(undefined); 

      try {
        // Call the API mutation. `mutateAsync` will throw an error on failure,
        // which is caught by the `catch` block.
        await mutateAsync(values);

        // On success, the `onSuccess` callback in `useSaveJournal` will handle
        // data invalidation automatically. We can set a success message here.
        setStatus({
          success: true,
          message: "Your journal entry has been saved successfully!",
        });
        
        // Clear the form fields for the next entry.
        resetForm();

      } catch (error) {
        // On failure, set an error message from the API or a default one.
        setStatus({
          success: false,
          message: error.message || "Something went wrong. Please try again.",
        });
      }
      // `setSubmitting(false)` is no longer needed as `isPending` handles the loading state.
    },
  });

  // Return the complete formik instance, but override `isSubmitting`
  // with the `isPending` state from TanStack Query for a single source of truth.
  return {
    ...formik,
    isSubmitting: isPending,
  };
};