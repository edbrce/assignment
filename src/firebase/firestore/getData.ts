import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, limit, Query, QuerySnapshot } from "firebase/firestore";
import { FirebaseError } from '@firebase/util';
import { User } from "firebase/auth";

type GetRecentDocumentsResponse = { result?: QuerySnapshot, error?: null | FirebaseError }
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
    error = e as FirebaseError;
  }

  // Return the result and error as an object
  return { result, error };
}

async function getDocuments(query: Query): Promise<GetRecentDocumentsResponse> {
  try {
    const querySnapshot = await getDocs(query);

    return { result: querySnapshot };
  } catch (e) {
    return { error: e as FirebaseError };
  }
}

export async function getRecentDocuments(): Promise<GetRecentDocumentsResponse> {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('timestamp', 'desc'), limit(10));

  const posts = await getDocuments(q);

  return posts;
}

export async function isUserAdmin(user: User): Promise<boolean> {
  const isUserAdmin = await getDocument('admins', user.uid);

  const { result } = isUserAdmin;

  console.log('admin?', isUserAdmin.result?.data(), user.uid);

  if (result?.exists()) {
    return result.data().admin || false;
  }

  return false;
}
