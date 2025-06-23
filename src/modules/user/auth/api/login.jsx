import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Function to call the login API endpoint
const loginUser = async (userData) => {
  const response = await api.post("/api/Auth/login", userData); // Adjust the path if needed
  return response;
};

// React Query mutation hook for user login
export const useUserLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginUser,
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
