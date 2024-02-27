'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

export type AppContext = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setAlert: (alert: boolean) => void;
    setAlertMessage: (message: string) => void;
};

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
    children: ReactNode;
}

// Provide the app context to child components, including loading states and any messages to display
export function AppContextProvider({
    children
}: AppContextProviderProps): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    return (
        <AppContext.Provider
            value={{ loading, setLoading, setAlert, setAlertMessage }}
        >
            {children}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar
                open={alert}
                autoHideDuration={6000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setAlert(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </AppContext.Provider>
    );
}
