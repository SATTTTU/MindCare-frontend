import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const verifyTherapist = (therapistId, params) => {
  console.log(`Making verify request to /api/admins/verify-cook/${therapistId} with params:`, params);
  return api.put(`/api/admins/verify-cook/${therapistId}`, params);
};

export const useVerifyTherapist = (therapistId, { mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: (params) => verifyTherapist(therapistId, params),
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