import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { journalValidationSchema } from "./schema/journelschema";
import { useSaveJournal } from "../api/saveJournel";

export const useJournalFormik = () => {
  const { mutateAsync, isLoading, error: apiError } = useSaveJournal();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      mood: "",
      date: new Date().toISOString().split("T")[0],
    },
    validationSchema: toFormikValidationSchema(journalValidationSchema),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        await mutateAsync(values);
        setStatus({ 
          success: true, 
          message: "Journal saved successfully!",
          error: null
        });
        resetForm();
      } catch (error) {
        setStatus({ 
          error: true, 
          message: error.message || "Failed to save journal. Please try again.",
          success: false
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    ...formik,
    isSubmitting: isLoading,
    apiError
  };
};