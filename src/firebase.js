// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4gupofgQjSsp3yvkJRxZhUskIkYlf3Cg",
  authDomain: "thruvdasboard.firebaseapp.com",
  projectId: "thruvdasboard",
  storageBucket: "thruvdasboard.firebasestorage.app",
  messagingSenderId: "324598910009",
  appId: "1:324598910009:web:44ae34f6f15f02289e91e8",
  measurementId: "G-EB9WPDZBLY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
