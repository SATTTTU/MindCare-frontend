import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// The actual API call function remains the same
export const verifyTherapist = (therapistId, params) => {
  // The endpoint might be 'approve' or 'verify' depending on your backend.
  // Let's stick with the 'approve' from your code.
  return api.patch(`/api/Admin/doctors/${therapistId}/approve`, params);
};


// REFACTORED CUSTOM HOOK
export const useVerifyTherapist = (therapistId, options = {}) => {
  const queryClient = useQueryClient();

  // Destructure any specific callbacks you want to override or enhance
  const { onSuccess, ...restOptions } = options;

  const mutation = useMutation({
    // 1. Provide the mutation function
    mutationFn: (params) => verifyTherapist(therapistId, params),
    
    // 2. Spread the rest of the options passed in from the component
    ...restOptions,

    // 3. Enhance the onSuccess callback
    onSuccess: (data, variables, context) => {
      // Invalidate queries to refetch data after a successful mutation
      queryClient.invalidateQueries({ queryKey: ['therapists'] });
      queryClient.invalidateQueries({ queryKey: ['documents', therapistId] });
      queryClient.invalidateQueries({ queryKey: ['therapist', therapistId] });


      // Call the original onSuccess from the component, if it exists
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
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