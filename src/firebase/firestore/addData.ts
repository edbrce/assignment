import { FirebaseError } from 'firebase/app';
import firebase_app from '../config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Post } from '@/app/types';

// Get the Firestore instance
const db = getFirestore(firebase_app);

export const addPost = async (
    postId: string,
    postData: Omit<Post, 'id'>
): Promise<null | FirebaseError> => {
    return await addData('posts', postId, postData);
};

// Function to add data to a Firestore collection
async function addData(
    collection: string,
    id: string,
    data: Omit<Post, 'id'>
): Promise<null | FirebaseError> {
    return setDoc(doc(db, collection, id), data, {
        merge: true // Merge the new data with existing document data
    })
        .then(() => {
            return null;
        })
        .catch((error) => {
            return error as FirebaseError;
        });
}
