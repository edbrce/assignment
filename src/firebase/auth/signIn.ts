import { FirebaseError } from 'firebase/app';
import firebase_app from '../config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign in with email and password
export default async function signIn(
    email: string,
    password: string
): Promise<null | FirebaseError> {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            return null;
        })
        .catch((error) => {
            return error as FirebaseError;
        });
}
