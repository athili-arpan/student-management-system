// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxmhRwiCTAX3FQO1mEfCiWhUrSvvCLw9s",
  authDomain: "student-management-6b107.firebaseapp.com",
  projectId: "student-management-6b107",
  storageBucket: "student-management-6b107.firebasestorage.app",
  messagingSenderId: "986913285396",
  appId: "1:986913285396:web:56bba2d0f5c0c7f1a3ce01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);