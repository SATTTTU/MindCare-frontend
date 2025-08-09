import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Delete therapist API call
export const deleteTherapist = async (therapistId) => {
  console.log(`Making DELETE request to /api/admins/delete-cook/${therapistId}`);
  return api.delete(`/api/admins/delete-cook/${therapistId}`);
};

// Hook for deleting therapist with query invalidation
export const useDeleteTherapist = (therapistId, { mutationConfig } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteTherapist(therapistId),
    onSuccess: (data, variables, context) => {
      // Invalidate documents query so list refreshes
      queryClient.invalidateQueries(["documents"]);

      // Call custom onSuccess if provided
      mutationConfig?.onSuccess?.(data, variables, context);
    },
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
