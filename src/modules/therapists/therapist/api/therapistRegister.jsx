// api/doctorApi.js
import { api } from "@/lib/api-client"; // or axios.create({ baseURL })
import { useMutation } from "@tanstack/react-query";

const registerDoctor = async (doctorData) => {
  const response = await api.post("/api/doctor-applications/apply", doctorData);
  return response;
};


export const useDoctorRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: registerDoctor,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
