'use client';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { CircularProgress } from '@mui/material';
import { isUserAdmin } from '@/firebase/firestore/getData';
import { AppUser } from '@/app/types';

// Initialize Firebase auth instance
const auth = getAuth(firebase_app);

// Create the authentication context
export const AuthContext = createContext({});

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({
    children
}: AuthContextProviderProps): JSX.Element {
    // Set up state to track the authenticated user and loading status
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to the authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isAdmin = await isUserAdmin(user);
                const appUser = user as AppUser;
                appUser.isAdmin = isAdmin;

                setUser(appUser);
            } else {
                // User is signed out
                setUser(null);
            }
            // Set loading to false once authentication state is determined
            setLoading(false);
        });

        // Unsubscribe from the authentication state changes when the component is unmounted
        return () => unsubscribe();
    }, []);

    // Provide the authentication context to child components
    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
