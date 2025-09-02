import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Fixing async and await
// eslint-disable-next-line react-refresh/only-export-components
const documentRegister = async (cookdata) => {
  const response = await api.post("/api/DoctorDocuments/upload", cookdata);
  return response; // Return response data
};

export const useDocumentRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: documentRegister,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Fixed the state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};