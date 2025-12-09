import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHRa4CS9FFCXzJzb2e5Kb4ICNY5EjSkoQ",
  authDomain: "movie-booking-99d50.firebaseapp.com",
  projectId: "movie-booking-99d50",
  storageBucket: "movie-booking-99d50.firebasestorage.app",
  messagingSenderId: "338569413856",
  appId: "1:338569413856:web:7ae82478669b8de06dbc85",
  measurementId: "G-THCPBYPD3H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);