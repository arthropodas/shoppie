
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn3Ee663RyokL7sY3ekIZ-GJTPdkLc2wY",
  authDomain: "shoppie-44b66.firebaseapp.com",
  projectId: "shoppie-44b66",
  storageBucket: "shoppie-44b66.appspot.com",
  messagingSenderId: "67450415003",
  appId: "1:67450415003:web:6f8cd8a939e9b95858233e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();