// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAfgVnoJnnf6c0tXlXuu2HR1iQ14BofLgg",
  authDomain: "invoicegenerator-a2002.firebaseapp.com",
  projectId: "invoicegenerator-a2002",
  storageBucket: "invoicegenerator-a2002.appspot.com",
  messagingSenderId: "306942798617",
  appId: "1:306942798617:web:49016f5700d59be354f388",
  measurementId: "G-W7VE534KBH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db  = getFirestore(app);
export const auth = getAuth(app);
