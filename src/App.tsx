import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import CategoryEditor from './category/presentation/categoryEditor';
import Template from './shared/presentation/template';
import { ModalProvider } from './shared/presentation/ui/modal';

import styles from './App.module.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <div className={styles.mainContainer}>
    <QueryClientProvider client={queryClient}>
      <Template>
        <ModalProvider>
          <CategoryEditor />
        </ModalProvider>
      </Template>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
