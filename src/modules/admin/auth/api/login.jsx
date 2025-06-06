import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Function to call the login API endpoint
const loginAdmin = async (admindata) => {
  const response = await api.post("/api/Admin/login", admindata); // Adjust the path if needed
  return response.data;
};

// React Query mutation hook for user login
export const useAdminLogin = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: loginAdmin,
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
