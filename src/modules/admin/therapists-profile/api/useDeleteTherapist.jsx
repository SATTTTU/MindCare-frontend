import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// The API function that performs the patch/delete request
export const deleteTherapist = (therapistId, data) => {
  // This endpoint seems to reject a doctor, which can be considered a "soft delete".
  return api.patch(`/api/Admin/doctors/${therapistId}/reject`, data || {}, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// THE CORRECTED CUSTOM HOOK
export const useDeleteTherapist = (therapistId, options = {}) => {
  const queryClient = useQueryClient();

  // Destructure any callbacks from the options object
  const { onSuccess, onError, ...restOptions } = options;

  const mutation = useMutation({
    // 1. Pass the mutation function
    mutationFn: (data) => deleteTherapist(therapistId, data),

    // 2. Spread the rest of the options
    ...restOptions,

    // 3. Create an enhanced onSuccess to handle query invalidation
    onSuccess: (data, variables, context) => {
      // Always invalidate queries first to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      queryClient.invalidateQueries({ queryKey: ['therapist', therapistId] });
      queryClient.invalidateQueries({ queryKey: ['documents', therapistId] });

      // If the component provided an onSuccess callback, call it
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },

    // 4. (Optional but good practice) Enhance onError
    onError: (error, variables, context) => {
      console.error("Failed to delete therapist:", error);

      // If the component provided an onError callback, call it
      if (onError) {
        onError(error, variables, context);
      }
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};