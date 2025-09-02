// hooks/useGetDoctors.js
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getDoctors = async () => {
  const response = await api.get("/api/Doctors");
  return response; 
};

export const useGetDoctors = (options = {}) => {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    ...options,
  });
};
