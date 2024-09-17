// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "protective-community.firebaseapp.com",
  projectId: "protective-community",
  storageBucket: "protective-community.appspot.com",
  messagingSenderId: "456489304569",
  appId: "1:456489304569:web:3bb77396af98ed55befd28",
};

export const app = initializeApp(firebaseConfig);
