// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNU1Z5AH_XBBEp-4RX_VWB53wKbo702sA",
  authDomain: "gatsby-firebase-9ff94.firebaseapp.com",
  projectId: "gatsby-firebase-9ff94",
  storageBucket: "gatsby-firebase-9ff94.appspot.com",
  messagingSenderId: "974023793156",
  appId: "1:974023793156:web:7778addeffe37916c93351"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export default db;