import { FirebaseError } from 'firebase/app';
import firebase_app from '../config';
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile
} from 'firebase/auth';

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign up a user with email and password
export default async function signUp(
    username: string,
    email: string,
    password: string
): Promise<null | FirebaseError> {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
            return updateProfile(response.user, {
                displayName: username
            }).then(() => {
                return null;
            });
        })
        .catch((error) => {
            return error as FirebaseError;
        });
}
