import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { journalValidationSchema } from "./schema/journelschema";
import { useSaveJournal } from "../api/saveJournel";

export const useJournalFormik = () => {
  const { mutateAsync } = useSaveJournal();

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
        setStatus({ success: true, message: "Journal saved successfully" });
        resetForm();
      } catch (error) {
        setStatus({ 
          error: true, 
          message: error.response?.data?.message || "Failed to save journal" 
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};