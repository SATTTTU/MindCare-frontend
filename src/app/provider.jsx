import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';

const QueryConfig = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
  },
};

export const AppProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: QueryConfig,
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      {children}
    </QueryClientProvider>
  );
};
