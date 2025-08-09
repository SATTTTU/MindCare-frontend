import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getAllTherapists = () => {
  return api.get('/api/Admin/doctors');
};

export const useGetAllTherapists = (queryConfig = {}) =>
  useQuery({
    queryKey: ["allTherapists"],
    queryFn: getAllTherapists,
    ...queryConfig,
  });
