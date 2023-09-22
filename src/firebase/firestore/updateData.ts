import { FirebaseError } from 'firebase/app';
import firebase_app from '../config';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

// Get the Firestore instance
const db = getFirestore(firebase_app);

export const updatePost = async (
    postId: string,
    newData: { title: string; body: string }
) => {
    return await updateData('posts', postId, newData);
};

// Function to add data to a Firestore collection
async function updateData(
    collection: string,
    id: string,
    newData: object
): Promise<null | FirebaseError> {
    return updateDoc(doc(db, collection, id), newData)
        .then(() => {
            return null;
        })
        .catch((error) => {
            return error as FirebaseError;
        });
}
