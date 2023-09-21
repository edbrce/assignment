import { FirebaseError } from "firebase/app";
import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to delete data from a Firestore collection
export default async function deleteData(
    collection: string,
    id: string
): Promise<null | FirebaseError> {
    return deleteDoc(doc(db, collection, id)).then(() => {
        return null;
    }).catch((error) => {
        return error as FirebaseError;
    })
}

export const deletePost = async (postId: string): Promise<null | FirebaseError> => {
    return deleteData('posts', postId).then((error) => {
        return error;
    });
}