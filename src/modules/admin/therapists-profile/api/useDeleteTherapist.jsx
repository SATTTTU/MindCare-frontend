// File Path: src/api/useDeleteTherapist.js

import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// API function to reject a therapist.
export const rejectTherapistAPI = (therapistId, data) => {
  // This function sends the PATCH request to your backend's reject endpoint.
  // It requires a `Notes` field in the data payload.
  return api.patch(`/api/Admin/doctors/${therapistId}/reject`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

// Custom hook to provide the rejection functionality to components.
export const useDeleteTherapist = (therapistId, options = {}) => {
  const queryClient = useQueryClient();

  // Destructure callbacks from the options object to enhance them.
  const { onSuccess, onError, ...restOptions } = options;

  const mutation = useMutation({
    // The function that will be called when the mutation is triggered.
    mutationFn: (data) => rejectTherapistAPI(therapistId, data),

    // Spread the rest of the options passed in from the component.
    ...restOptions,

    // Enhance the onSuccess callback to automatically refetch data.
    onSuccess: (data, variables, context) => {
      // Invalidate queries to update the UI with the new "Rejected" status.
      // This tells React Query that the data for these keys is stale and needs refetching.
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      queryClient.invalidateQueries({ queryKey: ['therapist', therapistId] });
      queryClient.invalidateQueries({ queryKey: ['documents', therapistId] });

      // Call the original onSuccess callback from the component (e.g., to show a toast).
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },

    // Enhance the onError callback for better debugging.
    onError: (error, variables, context) => {
      console.error("Failed to reject therapist:", error);
      if (onError) {
        onError(error, variables, context);
      }
    },
  });

  return {
    // We export `mutateAsync` as `rejectTherapist` for clear naming in components.
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};