// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";   

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB78xVoymvz1UXImgWC8Qz-d9Kr-jeS4D8",
  authDomain: "simongameapp-6d2a5.firebaseapp.com",
  projectId: "simongameapp-6d2a5",
  storageBucket: "simongameapp-6d2a5.appspot.com",
  messagingSenderId: "391782492591",
  appId: "1:391782492591:web:9651180232fc3075fda75a",
  measurementId: "G-650F3EGMK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);    
