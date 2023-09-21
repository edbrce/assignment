import { FirebaseError } from "firebase/app";
import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to add data to a Firestore collection
async function updateData(
    collection: string,
    id: string,
    newData: object
) {
    // Variable to store the result of the operation
    let result = null;
    // Variable to store any error that occurs during the operation
    let error = null;

    try {
        // Set the document with the provided data in the specified collection and ID
        result = await updateDoc(doc(db, collection, id), newData);
    } catch (e) {
        // Catch and store any error that occurs during the operation
        error = e as FirebaseError;
    }

    // Return the result and error as an object
    return { result, error };
}

export const updatePost = async (postId: string, newData: { title: string, body: string }) => {
    return await updateData('posts', postId, newData);
}