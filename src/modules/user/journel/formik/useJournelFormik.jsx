import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { journalValidationSchema } from "./schema/journelschema";

export const useJournalFormik = ({ 
  initialValues, 
  validationSchema, 
  onSubmit,
  enableReinitialize = false 
}) => {
  const defaultInitialValues = useMemo(() => ({
    title: "",
    content: "",
    mood: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  }), []);

  const handleSubmit = useCallback(async (values, helpers) => {
    try {
      // Transform message to lowercase before submission
      const transformedValues = {
        ...values,
        content: values.content?.toLowerCase() || "",
        mood: values.mood?.toLowerCase() || "",
      };

      await onSubmit(transformedValues);
      
      helpers.setStatus({ 
        success: true, 
        message: "journal entry saved successfully" // lowercase message
      });
      helpers.resetForm();
    } catch (error) {
      console.error("error saving journal entry:", error); // lowercase message
      
      // Set specific error messages based on error type
      if (error.response?.status === 400) {
        helpers.setErrors({ 
          submit: "invalid data provided. please check your entries." 
        });
      } else if (error.response?.status >= 500) {
        helpers.setErrors({ 
          submit: "server error. please try again later." 
        });
      } else {
        helpers.setErrors({ 
          submit: "failed to save journal entry. please try again." 
        });
      }
    } finally {
      helpers.setSubmitting(false);
    }
  }, [onSubmit]);

  const formik = useFormik({
    initialValues: initialValues || defaultInitialValues,
    validationSchema: journalValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize,
    onSubmit: handleSubmit,
  });

  // Custom methods for better UX
  const resetForm = useCallback(() => {
    formik.resetForm();
    formik.setStatus(null);
  }, [formik]);

  const setFieldValueAndValidate = useCallback(async (field, value) => {
    await formik.setFieldValue(field, value);
    if (formik.touched[field]) {
      formik.validateField(field);
    }
  }, [formik]);

  return {
    ...formik,
    resetForm,
    setFieldValueAndValidate,
    // Helper properties for easier access
    isSubmitting: formik.isSubmitting,
    hasErrors: Object.keys(formik.errors).length > 0,
    isDirty: formik.dirty,
  };
};