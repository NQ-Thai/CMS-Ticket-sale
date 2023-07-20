import { collection, getFirestore } from 'firebase/firestore';
import { app } from './Firebase';

export const firestore = getFirestore(app);

export const ticketCollection = collection(firestore, 'ticket');
