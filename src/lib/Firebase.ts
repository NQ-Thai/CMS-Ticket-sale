import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAYscqBXJmKLV_x_-8XTmGAliUpQtOFaUU',
    authDomain: 'cms-ticket-sale-9f089.firebaseapp.com',
    projectId: 'cms-ticket-sale-9f089',
    storageBucket: 'cms-ticket-sale-9f089.appspot.com',
    messagingSenderId: '855405566431',
    appId: '1:855405566431:web:ec631b30fd500ea7918c6a',
    measurementId: 'G-HQS4N3DSBZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
