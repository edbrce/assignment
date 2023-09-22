'use client';
import signUp from '@/firebase/auth/signup';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validateEmailField, validatePasswordField } from '../utils/validation';

function Page(): JSX.Element {
    const [username, setUserName] = useState('');
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

        const isEmailValid = validateEmailField(email);

        if (!isEmailValid) {
            setAlert(true);
            setLoading(false);
            setAlertMessage('Incorrect formatting of email');
            return;
        }

        const isPasswordValid = validatePasswordField(password);

        if (!isPasswordValid) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(
                'Passwords must be between 8-16 characters and contain a lowercase letter, uppercase letter, number and special character'
            );
            return;
        }

        // Attempt to sign up with provided email and password
        signUp(username, email, password).then((error) => {
            console.log('error');
            if (error) {
                setAlert(true);
                setLoading(false);
                setAlertMessage(error.message);
                return;
            }
            router.refresh();
            router.push('/');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen text-black">
            <div className="w-96 bg-white rounded shadow p-6">
                <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
                <form onSubmit={handleForm} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">
                            Username
                        </label>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            name="username"
                            id="username"
                            placeholder="username"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 font-medium"
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
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 font-medium"
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
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded"
                    >
                        Sign up
                    </button>
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
