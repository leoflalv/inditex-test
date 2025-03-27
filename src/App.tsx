import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import CategoryEditor from './category/presentation/categoryEditor';
import ErrorBoundary from './shared/presentation/errorBoundary';
import { SnackbarProvider } from './shared/presentation/snackbar';
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
      <SnackbarProvider>
        <Template>
          <ModalProvider>
            <ErrorBoundary>
              <CategoryEditor />
            </ErrorBoundary>
          </ModalProvider>
        </Template>
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default App;
