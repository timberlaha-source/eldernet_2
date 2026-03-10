src/firebase.ts
// Firebase core
import { initializeApp } from "firebase/app";

// Analytics (optional)
import { getAnalytics } from "firebase/analytics";

// Authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9yM7EGrF081MCOOLpg7DYkg1ExtQkauw",
  authDomain: "dernet-9d041.firebaseapp.com",
  projectId: "dernet-9d041",
  storageBucket: "dernet-9d041.firebasestorage.app",
  messagingSenderId: "353006454216",
  appId: "1:353006454216:web:519b0ee7ceb283440a6cfd",
  measurementId: "G-5159XV9HNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (only runs in browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

import { auth, googleProvider } from "@/firebase";
// Export app if needed elsewhere
export default app;
