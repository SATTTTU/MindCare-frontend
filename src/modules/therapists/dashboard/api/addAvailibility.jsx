// src/api/addAvailibility.js
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const postAvailability = async ({ doctorId, day, startTime, endTime }) => {
  if (!doctorId) {
    throw new Error("doctorId is required!"); // 🚨 catch undefined early
  }

  console.log("Posting availability:", { doctorId, day, startTime, endTime });

  const response = await api.post(`/api/Doctors/${doctorId}/availability`, {
    day,
    startTime,
    endTime,
  });

  return response.data; // return response data directly
};

export const usePostAvailability = () => {
  return useMutation({
    mutationFn: postAvailability,
  });
};
