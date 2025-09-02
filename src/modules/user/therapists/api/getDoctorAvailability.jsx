// hooks/useGetDoctor.js
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const GetDoctorAvailibility = async (id) => {
  const response = await api.get(`/api/Doctors/${id}/availability`);
  return response; // make sure to return data, not the whole axios response
};

export const usegetDoctorAvailaibity = (id, options = {}) => {
  return useQuery({
    queryKey: ["availability", id], 
    queryFn: () => GetDoctorAvailibility(id),
    enabled: !!id, 
    ...options,
  });
};
