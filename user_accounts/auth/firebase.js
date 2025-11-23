// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



