// Import needed Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuo2BNzYJoqqrk1wprMf7XVZamVfHDm1w",
  authDomain: "fakestore-c0c16.firebaseapp.com",
  projectId: "fakestore-c0c16",
  storageBucket: "fakestore-c0c16.firebasestorage.app",
  messagingSenderId: "500156588036",
  appId: "1:500156588036:web:be1af5ede0e76c3c6a9551",
  measurementId: "G-MFQJV4BXV5"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Firebase Authentication and Google Auth provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export all needed Firebase services
export { auth, db, googleProvider };

