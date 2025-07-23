import { useFormik } from 'formik';
import { CategorySchema } from './schema/postschema';

export const useCategoryForm = (initialValues, onSubmit) => {
  return useFormik({
    initialValues,
    validate: (values) => {
      try {
        CategorySchema.parse(values);
        return {};
      } catch (error) {
        const errors = {};
        error.errors.forEach(err => {
          errors[err.path[0]] = err.message;
        });
        return errors;
      }
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await onSubmit(values);
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true, // Important for editing
  });
};