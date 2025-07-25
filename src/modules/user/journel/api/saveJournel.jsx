import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const useSaveJournal = () => {
  const saveJournalMutation = useMutation({
    mutationFn: (journalDataFromForm) => {
      // 1. Get the raw text content from the form's values
      const content = journalDataFromForm.text;

      // 2. POST the raw content string to the correct controller endpoint.
      //    The URL must match your controller's route: `api/JournalEntries`.
      //    Since your `api` instance has a baseURL of `.../api`,
      //    the relative path is `/JournalEntries`.
      return api.post("/api/JournalEntries", content);
    },
  });

  return {
    ...saveJournalMutation,
    isLoading: saveJournalMutation.isPending,
  };
};