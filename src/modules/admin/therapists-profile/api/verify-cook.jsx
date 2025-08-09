// File Path: src/api/verify-cook.js

import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API function to approve a therapist.
export const verifyTherapistAPI = (therapistId, params) => {
  return api.patch(`/api/Admin/doctors/${therapistId}/approve`, params);
};

// Custom hook for approving a therapist.
export const useVerifyTherapist = (therapistId, options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options;

  const mutation = useMutation({
    mutationFn: (params) => verifyTherapistAPI(therapistId, params),
    ...restOptions,
    onSuccess: (data, variables, context) => {
      // Invalidate queries to update the UI with the new "Verified" status.
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      queryClient.invalidateQueries({ queryKey: ['therapist', therapistId] });
      queryClient.invalidateQueries({ queryKey: ['documents', therapistId] });
      
      // Call the component's onSuccess callback.
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
  });
  
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
  };
};