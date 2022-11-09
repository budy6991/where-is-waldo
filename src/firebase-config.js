import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDynmNT0140WY2IvNqcDoimQaPH-pQJKN8",
  authDomain: "where-is-waldo-400d8.firebaseapp.com",
  projectId: "where-is-waldo-400d8",
  storageBucket: "where-is-waldo-400d8.appspot.com",
  messagingSenderId: "676561079309",
  appId: "1:676561079309:web:46634accb7afe42c5b5944",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
