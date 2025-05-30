import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSaveJournal = () => {
  const mutationFn = async (journalData) => {
    const transformedData = {
      ...journalData,
      date: journalData.date || new Date().toISOString().split("T")[0],
    };

    const response = await axios.post(
      "http://localhost:3001/api/journals",
      transformedData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn,
    onError: (error) => {
      throw new Error(error.response?.data?.message || "Failed to save journal");
    }
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error
  };
};