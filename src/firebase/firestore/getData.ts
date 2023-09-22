import firebase_app from '../config';
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    Query,
    QuerySnapshot,
    DocumentSnapshot
} from 'firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { User } from 'firebase/auth';

type GetRecentDocumentsResponse = {
    result?: QuerySnapshot;
    error?: null | FirebaseError;
};

type GetRecentDocumentResponse = {
    result?: DocumentSnapshot;
    error?: null | FirebaseError;
};

// Get the Firestore instance
const db = getFirestore(firebase_app);

export async function getRecentDocuments(): Promise<GetRecentDocumentsResponse> {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'), limit(15));

    const posts = await getDocuments(q);

    return posts;
}

export async function isUserAdmin(user: User): Promise<boolean> {
    const isUserAdmin = await getDocument('admins', user.uid);
    const { result } = isUserAdmin;

    if (result?.exists()) {
        return result.data().admin || false;
    }

    return false;
}

// Function to retrieve a document from a Firestore collection
export async function getDocument(
    collection: string,
    id: string
): Promise<GetRecentDocumentResponse> {
    // Create a document reference using the provided collection and ID
    const docRef = doc(db, collection, id);

    return getDoc(docRef)
        .then((result) => {
            return { result };
        })
        .catch((error) => {
            return { error: error as FirebaseError };
        });
}

async function getDocuments(query: Query): Promise<GetRecentDocumentsResponse> {
    return getDocs(query)
        .then((result) => {
            return { result };
        })
        .catch((error) => {
            return { error: error as FirebaseError };
        });
}
