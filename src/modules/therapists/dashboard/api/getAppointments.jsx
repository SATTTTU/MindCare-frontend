import { api } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Get all doctor appointments
const getDoctorAppointments = async () => {
  const response = await api.get("/api/Appointments/doctor");
  return response;
};

export const useGetDoctorAppointments = (options = {}) => {
  return useQuery({
    queryKey: ["doctorAppointments"],
    queryFn: getDoctorAppointments,
    ...options,
  });
};

// Accept appointment
const acceptAppointment = async (id) => {
  await api.put(`/api/Appointments/${id}/accept`);
};

export const useAcceptAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorAppointments"]);
    },
  });
};

// Reject appointment
const rejectAppointment = async ({ id, doctorNotes }) => {
  await api.put(`/api/Appointments/${id}/reject`, { doctorNotes });
};

export const useRejectAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(["doctorAppointments"]);
    },
  });
};
const completeAppointment = async (id) => {
  await api.put(`/api/Appointments/${id}/complete`);
};

export const useCompleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeAppointment,
    onSuccess: () => queryClient.invalidateQueries(["doctorAppointments"]),
  });
};
