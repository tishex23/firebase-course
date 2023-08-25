// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" 
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeM1H8mte9PNdAV27IvyL6ZeMkxvthr5U",
  authDomain: "fir-course-9603e.firebaseapp.com",
  projectId: "fir-course-9603e",
  storageBucket: "fir-course-9603e.appspot.com",
  messagingSenderId: "713103152581",
  appId: "1:713103152581:web:c505e6273ff31d0128a7ac",
  measurementId: "G-RW5K0TE9ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);