// delete-therapist.js
import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteTherapist = async (therapistId) => {
  return api.delete(`/api/admins/delete-cook/${therapistId}`);
};

export const useDeleteTherapist = (therapistId, { mutationConfig } = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteTherapist(therapistId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["documents"]);  // refresh relevant data

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
