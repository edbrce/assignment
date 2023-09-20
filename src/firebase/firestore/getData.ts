import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, limit, Query, QuerySnapshot } from "firebase/firestore";
import { FirebaseError } from '@firebase/util';

type GetRecentDocumentsResponse = { result?: QuerySnapshot, error?: any }
// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to retrieve a document from a Firestore collection
export async function getDocument(collection: string, id: string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    result = await getDoc(docRef);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}

export async function getRecentDocuments(): Promise<GetRecentDocumentsResponse> {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('timestamp'), limit(5));

  const posts = await getDocuments(q);

  return posts;
}

async function getDocuments(query: Query): Promise<GetRecentDocumentsResponse> {
  try {
    const querySnapshot = await getDocs(query);

    return { result: querySnapshot };
  } catch (e) {
    return { error: e };
  }
}
