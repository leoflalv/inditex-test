import { createContext, useCallback, useContext, useState } from 'react';

import { Snackbar } from './Snackbar';

interface SnackbarContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarState {
  open: boolean;
  message: string;
  type: 'success' | 'error';
}

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    type: 'success',
  });

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSnackbar({ open: true, message, type: 'success' });
  }, []);

  const showError = useCallback((message: string) => {
    setSnackbar({ open: true, message, type: 'error' });
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSuccess, showError }}>
      {children}
      {snackbar.open && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
