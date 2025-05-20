import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
