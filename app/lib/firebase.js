// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB78xVoymvz1UXImgWC8Qz-d9Kr-jeS4D8",
  authDomain: "simongameapp-6d2a5.firebaseapp.com",
  projectId: "simongameapp-6d2a5",
  storageBucket: "simongameapp-6d2a5.firebasestorage.app",
  messagingSenderId: "391782492591",
  appId: "1:391782492591:web:9651180232fc3075fda75a",
  measurementId: "G-650F3EGMK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);