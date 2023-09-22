// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA1V-oQ_apZ4HNkVigjYZteoqopXBNgFK0',
    authDomain: 'eddies-assignment.firebaseapp.com',
    projectId: 'eddies-assignment',
    storageBucket: 'eddies-assignment.appspot.com',
    messagingSenderId: '229232023835',
    appId: '1:229232023835:web:d86421f4b39d3c9aa39bbe'
};

// Initialize Firebase
const firebase_app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
