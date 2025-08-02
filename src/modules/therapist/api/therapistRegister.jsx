import { api } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";

const createApplication = async (profileData) => {
  const response = await api.post('/api/doctor-applications/apply', profileData);
  return response;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applicatiomn'] });
    }
  });
};