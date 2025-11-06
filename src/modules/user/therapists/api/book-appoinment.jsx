import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const bookAppointment = async (appointmentData) => {
  const response = await api.post(`/api/Appointments`, appointmentData);
  return response.data;
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["availability"] });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
