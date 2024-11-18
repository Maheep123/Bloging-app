// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn5nho-GQ8eYg0bVf2DihLDL_9_WKiuq4",
  authDomain: "blog-app-ee157.firebaseapp.com",
  databaseURL: "https://blog-app-ee157-default-rtdb.firebaseio.com",
  projectId: "blog-app-ee157",
  storageBucket: "blog-app-ee157.firebasestorage.app",
  messagingSenderId: "426281249553",
  appId: "1:426281249553:web:b6ee55f0f07f203c967ab0",
  measurementId: "G-M9ET9798CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
