// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQuhszwkPwGRoHllCHkW8DG9xluEGkhRs",
  authDomain: "voxa-445cb.firebaseapp.com",
  projectId: "voxa-445cb",
  storageBucket: "voxa-445cb.firebasestorage.app",
  messagingSenderId: "339592754365",
  appId: "1:339592754365:web:334996b9c8a6c09f3633d4",
  measurementId: "G-BV68Z0V7FB",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default { app, auth, db, analytics };
