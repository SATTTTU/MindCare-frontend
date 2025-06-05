import { z } from "zod";

export const journalValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "title must be at least 3 characters long" })
    .max(100, { message: "title cannot exceed 100 characters" }),
  
  text: z
    .string()
    .min(10, { message: "content must be at least 10 characters long" })
    .max(5000, { message: "content cannot exceed 5000 characters" })
    .refine(
      (value) => {
        const meaningfulWords = value.trim().split(/\s+/).filter(word => word.length > 2);
        return meaningfulWords.length >= 3;
      },
      { message: "please write something meaningful" }
    ),
  
  mood: z.enum([
    "happy", "calm", "neutral", "sad", "angry", "anxious", "tired", "grateful"
  ], {
    errorMap: () => ({ message: "please select a valid mood" }),
  }),
  
  date: z
    .preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
      z.date().max(new Date(), { message: "date cannot be in the future" })
    ),
});