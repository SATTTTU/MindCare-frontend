import { useFormik } from 'formik';
import { PostSchema } from './schema/postschema';

export const usePostForm = (initialValues, onSubmit) => {
  return useFormik({
    initialValues,
    validate: (values) => {
      try {
        // We manually handle file types, so Zod validates the rest
        const { featuredImage, ...otherValues } = values;
        PostSchema.parse(otherValues);
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
        // You might want to set a form-level error here
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true, // Important for editing
  });
};