import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    Firestore,
    collection,
    doc,
    getFirestore,
} from 'firebase/firestore';
import { app } from './Firebase';

// Define a custom type for your Firestore instance
interface CustomFirestore extends Firestore {
    collection: (path: string) => CollectionReference<DocumentData>;
}

// Get the Firestore instance
export const firestore = getFirestore(app) as CustomFirestore;

export const ticketCollection = collection(firestore, 'ticket');

export const ticketPackageCollection: CollectionReference<DocumentData> = collection(
    firestore,
    'ticketPackage',
) as CollectionReference<DocumentData>;

export const getTicketPackageDocRef = (docId: string): DocumentReference<DocumentData> => {
    return doc(ticketPackageCollection, docId);
};
