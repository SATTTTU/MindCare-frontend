import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getTherapists = async () => {
  const response = await api.get('/api/User/therapists');
  return response;
};

export const useGetBlogs = (options = {}) => {
  return useQuery({
    queryKey: ['therapists'],
    queryFn: getTherapists,
    ...options
  });
};