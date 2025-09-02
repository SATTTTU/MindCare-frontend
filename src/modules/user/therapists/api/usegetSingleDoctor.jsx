// hooks/useGetDoctor.js
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getSingleDoctor = async (id) => {
  const response = await api.get(`/api/Doctors/${id}`);
  return response; // make sure to return data, not the whole axios response
};

export const useGetSingleDoctor = (id, options = {}) => {
  return useQuery({
    queryKey: ["doctor", id], 
    queryFn: () => getSingleDoctor(id),
    enabled: !!id, 
    ...options,
  });
};
