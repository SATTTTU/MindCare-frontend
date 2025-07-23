// formik/schema/postschema.js
import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
    
  content: z.string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters'),
    
  // THIS IS THE CRUCIAL LINE. IT MUST BE 'categoryId'.
  categoryId: z.string()
    .min(1, 'You must select a category'),
    
  tags: z.string()
    .optional()
    .transform(val => val || ''),
    
  // featuredImage is validated separately, so we don't need Zod rules here.
  // We are removing it from this schema because it's not part of the 'otherValues'
  // that we parse. This makes the validation even cleaner.
});


export const CategorySchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Category name can only contain letters, numbers, and spaces')
});