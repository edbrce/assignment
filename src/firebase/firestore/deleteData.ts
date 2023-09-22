import { FirebaseError } from 'firebase/app';
import firebase_app from '../config';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

// Get the Firestore instance
const db = getFirestore(firebase_app);

export const deletePost = async (
    postId: string
): Promise<null | FirebaseError> => {
    return await deleteData('posts', postId);
};

// Function to delete data from a Firestore collection
async function deleteData(
    collection: string,
    id: string
): Promise<null | FirebaseError> {
    return deleteDoc(doc(db, collection, id))
        .then(() => {
            return null;
        })
        .catch((error) => {
            return error as FirebaseError;
        });
}
