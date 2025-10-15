// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo33XReznYSOMWjkZoPKURk2ncVmxPP70",
  authDomain: "study-tracker-52ea2.firebaseapp.com",
  projectId: "study-tracker-52ea2",
  storageBucket: "study-tracker-52ea2.firebasestorage.app",
  messagingSenderId: "417429717109",
  appId: "1:417429717109:web:fc30ee2572973a3bbbb83c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();