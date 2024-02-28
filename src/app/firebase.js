import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: "1:843594694910:web:1bf3b9266fa3262471a5af",
  measurementId: "G-93R77547B5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
