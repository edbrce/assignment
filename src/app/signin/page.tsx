'use client';
import signIn from '@/firebase/auth/signIn';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validateEmailField, validatePasswordField } from '../utils/validation';

function Page(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const router = useRouter();

    // Handle form submission
    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);

        const isFormValid =
            validateEmailField(email) && validatePasswordField(password);

        if (!isFormValid) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(
                'Invalid credentials, please check the email and password entered'
            );
            return;
        }

        // Attempt to sign in with provided email and password
        const { error } = await signIn(email, password);

        if (error) {
            setAlert(true);
            setLoading(false);
            if (error.code === 'auth/invalid-login-credentials') {
                setAlertMessage(
                    'Invalid credentials, please check the email and password entered'
                );
            } else {
                setAlertMessage(error.code);
            }
            return;
        }

        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-xs">
                <form
                    onSubmit={handleForm}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <h1 className="text-3xl font-bold mb-6 text-black">
                        Sign In
                    </h1>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

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
        </div>
    );
}

export default Page;
