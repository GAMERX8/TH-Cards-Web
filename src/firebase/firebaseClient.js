// /firebase/firebaseClient.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAInQ6EMmYW5CBU6p72w6-gHr4NjHjA0pc",
  authDomain: "th-cards.firebaseapp.com",
  projectId: "th-cards",
  storageBucket: "th-cards.firebasestorage.app",
  messagingSenderId: "123887969609",
  appId: "1:123887969609:web:f88529322464dfff00a698"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };