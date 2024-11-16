// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from your Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBIp5w-PtbieSjJWiBnY57NTOfpFYeoelQ",
    authDomain: "bookexchange-80b52.firebaseapp.com",
    projectId: "bookexchange-80b52",
    storageBucket: "bookexchange-80b52.firebasestorage.app",
    messagingSenderId: "989882105970",
    appId: "1:989882105970:web:66f0828f3bd3ab6b9282eb",
    measurementId: "G-Z3F832Y6NF"
  };

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);