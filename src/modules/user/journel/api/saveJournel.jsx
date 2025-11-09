import { api } from "@/lib/api-client"; // Assuming this is your configured TanStack Query client
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Retrieves the user ID from localStorage.
 * @returns {string|null} The user ID string or null if not found.
 */
const getUserId = () => {
  try {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return null;

    const userData = JSON.parse(userDataString);
    return userData.id || null;
  } catch (error) {
    console.error("Error reading userData from localStorage:", error);
    return null;
  }
};

export const useSaveJournal = () => {
  const queryClient = useQueryClient();

  const saveJournalMutation = useMutation({
    /**
     * @param {object} journalDataFromForm - The object from the Formik form submission.
     * @param {string} journalDataFromForm.text - The content of the journal entry.
     */
    mutationFn: (journalDataFromForm) => {
      const content = journalDataFromForm.text;
      const userIdString = getUserId();

      // --- Start of the Fix ---

      // 1. Validate that the user ID string exists.
      if (!userIdString) {
        return Promise.reject(new Error("User is not authenticated. Cannot save entry."));
      }

      // 2. Convert the user ID string to an integer.
      // The `10` is the radix, ensuring it's parsed as a base-10 number.
      const userIdNumber = parseInt(userIdString, 10);

      // 3. Add a check to ensure the conversion was successful.
      if (isNaN(userIdNumber)) {
        return Promise.reject(new Error("Invalid User ID format. Cannot save entry."));
      }

      // 4. Construct the payload with the CORRECT data types.
      const payload = {
        content: content,
        userId: userIdNumber, // Send the userId as a number
      };

      // --- End of the Fix ---

      // 5. POST the correctly typed JSON payload to the controller.
      return api.post("/api/JournalEntries", payload);
    },
    onSuccess: () => {
      const userId = getUserId();
      if (userId) {
        // Invalidate queries to automatically refetch mood history after a successful post.
        queryClient.invalidateQueries({ queryKey: ['journalEntries', userId] });
      }
    },
  });

  return saveJournalMutation;
};