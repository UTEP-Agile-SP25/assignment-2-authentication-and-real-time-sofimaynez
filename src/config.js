// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQxFEea9JaPmn_CPsUTLMPmR-uWbz5gyQ",
  authDomain: "martinez-sandbox.firebaseapp.com",
  projectId: "martinez-sandbox",
  storageBucket: "martinez-sandbox.firebasestorage.app",
  messagingSenderId: "813804828009",
  appId: "1:813804828009:web:ce25d7c0a5261e378079f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);
export default app;