import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    collection,
    doc,
    getFirestore,
} from 'firebase/firestore';
import { app } from './Firebase';

export const firestore = getFirestore(app);

export const ticketCollection = collection(firestore, 'ticket');

export const ticketPackageCollection: CollectionReference<DocumentData> = collection(
    firestore,
    'ticketPackage',
) as CollectionReference<DocumentData>;

export const getTicketPackageDocRef = (docId: string): DocumentReference<DocumentData> => {
    return doc(ticketPackageCollection, docId);
};
