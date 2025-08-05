import { api } from "@/lib/api-client";
import { useMutation} from "@tanstack/react-query";

// Get All Cooks API Call without parameters (fetch all)
export const getAllTherapists = () => {
  return api.get('/api/Admin/doctors');
};

export const useGetAllTherapists = ({ mutationConfig } = {}) => {

  const mutation = useMutation({
    mutationFn: getAllTherapists,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};