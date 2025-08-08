
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6z2mFUboCK14xZs1cjSWkYUVukgBQuSo",
  authDomain: "firestore-app-3576f.firebaseapp.com",
  projectId: "firestore-app-3576f",
  storageBucket: "firestore-app-3576f.firebasestorage.app",
  messagingSenderId: "605884722872",
  appId: "1:605884722872:web:59d2f5485182c7046b4e4d"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);