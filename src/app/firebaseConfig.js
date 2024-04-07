// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt54gRdTxPZ2QQw0TnQ02PB-EZ0K-LFMU",
  authDomain: "syntaxsoftwareinnovation.firebaseapp.com",
  projectId: "syntaxsoftwareinnovation",
  storageBucket: "syntaxsoftwareinnovation.appspot.com",
  messagingSenderId: "771305716540",
  appId: "1:771305716540:web:04b7cd620aa52abebabc39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);