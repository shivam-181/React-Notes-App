// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE THIS WITH YOUR OWN CONFIG FROM THE FIREBASE CONSOLE
const firebaseConfig = {
   apiKey: "AIzaSyDrMYfgXOxDSkhQ7Z15cn32Am_rTA918KU",
  authDomain: "notes-app-f45be.firebaseapp.com",
  projectId: "notes-app-f45be",
  storageBucket: "notes-app-f45be.firebasestorage.app",
  messagingSenderId: "1007966276072",
  appId: "1:1007966276072:web:6409221ca75d7c4976fc5d",
  measurementId: "G-TH3LLMSK8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
