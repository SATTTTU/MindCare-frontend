import { useState } from "react";
const useSaveJournal = ({ mutationConfig } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const mutateAsync = async (journalData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Transform data to lowercase as requested
      const transformedData = {
        ...journalData,
        content: journalData.content?.toLowerCase() || "",
        mood: journalData.mood?.toLowerCase() || "",
        date: journalData.date || new Date().toISOString().split("T")[0]
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving to API:", transformedData);
      
      setIsSuccess(true);
      return { success: true, data: transformedData };
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutateAsync, isLoading, isSuccess, error };
};
