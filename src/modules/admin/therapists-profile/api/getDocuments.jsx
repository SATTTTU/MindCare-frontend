// api/getDocuments.js
import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// API call
const getDocuments = async (doctorId) => {
  const response = await api.get(`/api/Admin/doctors/${doctorId}/documents`);
  return response;
};

// Custom hook
export const usegetDocuments = (doctorId, queryConfig = {}) => {
  return useQuery({
    queryKey: ["documents", doctorId],
    queryFn: () => getDocuments(doctorId),
    ...queryConfig,
  });
};
