import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

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
      {children}
    </QueryClientProvider>
  );
};
