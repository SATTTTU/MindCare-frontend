// formik/usePostformik.js

import { useFormik } from 'formik';
import { PostSchema } from './schema/postschema';

export const usePostForm = (initialValues, onSubmit) => {
  return useFormik({
    initialValues,
    validate: (values) => {
      try {
        // We separate the file so Zod doesn't try to validate it.
        const { featuredImage, ...otherValues } = values;
        
        // PostSchema now correctly validates the 'otherValues'
        PostSchema.parse(otherValues); 
        
        return {}; // Success
      } catch (error) {
        const errors = {};
        error.errors.forEach(err => {
          errors[err.path[0]] = err.message;
        });
        
 
        console.error('Validation Errors:', errors); 
        return errors;
      }
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // --- DEBUG: See if onSubmit is even being reached ---
      console.log('Submit triggered with values:', values); 
      try {
        await onSubmit(values);
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });
};