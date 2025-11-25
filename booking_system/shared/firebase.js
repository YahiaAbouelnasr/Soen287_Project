// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiHJmw1kFDkmIHcT--Ig3fo2Ynr8EkJUQ",
  authDomain: "crbs-b358b.firebaseapp.com",
  projectId: "crbs-b358b",
  storageBucket: "crbs-b358b.firebasestorage.app",
  messagingSenderId: "732688441318",
  appId: "1:732688441318:web:c3f37485c55b43da0e50b",
  measurementId: "G-8K0H6MV0JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
