// src/utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5fqZl9_KFplY1TrRIQGXei9W2lTvFtB0",
  authDomain: "probot-128f6.firebaseapp.com",
  projectId: "probot-128f6",
  storageBucket: "probot-128f6.firebasestorage.app",
  messagingSenderId: "81031268409",
  appId: "1:81031268409:web:9faeff7c5fb47d2eaa65e8",
  measurementId: "G-BEW4HZ54MF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Optional: Initialize Analytics
import { getAnalytics } from "firebase/analytics";
const analytics = getAnalytics(app);

export { db, analytics };