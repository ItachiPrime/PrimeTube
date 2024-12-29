import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAoF8lBhCLzs4obIVLkaSTrVUAZ0wfUiF0",
  authDomain: "primetube-7a902.firebaseapp.com",
  projectId: "primetube-7a902",
  storageBucket: "primetube-7a902.firebasestorage.app",
  messagingSenderId: "477932694135",
  appId: "1:477932694135:web:00f0742324ad98f7557472",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db };
export { auth };
