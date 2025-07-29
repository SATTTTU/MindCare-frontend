import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

const getBlogs = async () => {
  const response = await api.get('/api/Blog/recommendations');
  return response;
};

export const useGetBlogs = (options = {}) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    ...options
  });
};