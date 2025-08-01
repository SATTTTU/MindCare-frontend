import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Get Users API
const getUsers = async () => {
  const response = await api.get("/api/Admin/users");
  return response;
};

export const useUserList = (queryConfig = {}) => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    ...queryConfig,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};