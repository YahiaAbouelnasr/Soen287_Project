// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSZLPhEEKO7cymNy-0NtXMB-LUU_Vqn0I",
  authDomain: "soen-287-proj.firebaseapp.com",
  projectId: "soen-287-proj",
  storageBucket: "soen-287-proj.firebasestorage.app",
  messagingSenderId: "714004706656",
  appId: "1:714004706656:web:e8e33d9bc0336bdb5f9a05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
