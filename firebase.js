// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiHJmw1kFDkmIHcT--Tg3fo2Ynr8EkJUQ",
  authDomain: "crbs-b358b.firebaseapp.com",
  projectId: "crbs-b358b",
  storageBucket: "crbs-b358b.firebasestorage.app",
  messagingSenderId: "732684413138",
  appId: "1:732684413138:web:cf3f37485c55b43da0e50b",
  measurementId: "G-8K0H6MV0JC"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
