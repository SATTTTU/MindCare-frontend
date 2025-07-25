import { z } from "zod";

export const journalValidationSchema = z.object({
  /**
   * Validates the main text content of the journal entry.
   * Ensures the text is between 10 and 5000 characters and contains meaningful content.
   */
  text: z
    .string()
    .min(10, { message: "Your entry must be at least 10 characters long." })
    .max(5000, { message: "Content cannot exceed 5000 characters." })
    .refine(
      (value) => {
        // A simple check to ensure the entry isn't just short, meaningless words.
        // It counts words that are more than 2 characters long.
        const meaningfulWords = value.trim().split(/\s+/).filter(word => word.length > 2);
        return meaningfulWords.length >= 3;
      },
      { message: "Please write something more meaningful." }
    ),

  /**
   * Validates the date of the journal entry.
   * It preprocesses string or Date inputs and ensures the date is not in the future.
   */
  date: z
    .preprocess(
      (arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : undefined),
      z.date().max(new Date(), { message: "The date cannot be in the future." })
    ),
});