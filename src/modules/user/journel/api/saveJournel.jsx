import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSaveJournal = () => {
  const mutation = useMutation(async (journalData) => {
    const transformedData = {
      ...journalData,
      date: journalData.date || new Date().toISOString().split("T")[0],
    };

    const response = await axios.post(
      "https://localhost:5000/api/journals",
      transformedData
    );

    return response.data;
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
};