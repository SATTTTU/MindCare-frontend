import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Function to call the login API endpoint
const chatRequest = async (ChatData) => {
  const response = await api.post("/api/Chat/login", ChatData); // Adjust the path if needed
  return response;
};

// React Query mutation hook for user login
export const useChatRequest = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: chatRequest,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
