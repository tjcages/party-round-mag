// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  apiKey: "AIzaSyCMTHlq_jXKN8Zopa8TsURdSbSosBisfIk",
  authDomain: "party-round-mag.firebaseapp.com",
  projectId: "party-round-mag",
  storageBucket: "party-round-mag.appspot.com",
  messagingSenderId: "837976712244",
  appId: "1:837976712244:web:45d4167c2b4ad126685661",
  measurementId: "G-2VTRM9MCF4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export async function createUser(email) {
  const pass = window.btoa(email);

  return createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch(async (error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          const user = await signInExistingUser(email, pass);
          return user;
        case "auth/invalid-email":
          console.log(`Email address ${this.state.email} is invalid.`);
          return;
        default:
          const errorMessage = error.message;
          console.log(errorMessage);
          return;
      }
    });
}

async function signInExistingUser(email, pass) {
  return signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
