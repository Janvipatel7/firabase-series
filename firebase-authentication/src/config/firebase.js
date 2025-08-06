import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA8pjJQ1X43ECygKQKIKe93_fggl2VTBLk",
  authDomain: "react-fire-app-5ae9a.firebaseapp.com",
  projectId: "react-fire-app-5ae9a",
  storageBucket: "react-fire-app-5ae9a.firebasestorage.app",
  messagingSenderId: "279180705388",
  appId: "1:279180705388:web:b797767338165f6d862249"
};

export const app = initializeApp(firebaseConfig);