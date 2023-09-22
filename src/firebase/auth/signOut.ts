import { FirebaseError } from 'firebase/app';
import firebase_app from '../config';
import { getAuth } from 'firebase/auth';

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign in with email and password
export default async function signOut() {
    let result = null, // Variable to store the sign-in result
        error = null; // Variable to store any error that occurs

    try {
        result = await auth.signOut(); // Sign in with email and password
    } catch (e) {
        error = e as FirebaseError; // Catch and store any error that occurs during sign-in
    }

    return { result, error }; // Return the sign-in result and error (if any)
}
