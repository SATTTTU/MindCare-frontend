import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const postAvailability = async ({ doctorId, startTime, endTime }) => {
  const response = await api.post(`/api/Doctors/${doctorId}/availability`, {
    startTime,
    endTime, // ✅ only these
  });
  return response;
};



export const usePostAvailability = () => {
  return useMutation({
    mutationFn: postAvailability,
  });
};
