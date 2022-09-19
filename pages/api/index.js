// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  onSnapshot
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const db = getFirestore(app);

export async function createUser(email) {
  const pass = window.btoa(email);

  return createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      return { user, state: "success" };
    })
    .catch(async (error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          const user = await signInExistingUser(email, pass);
          return { user, state: "success" };
        case "auth/invalid-email":
          console.log(`Email address ${email} is invalid.`);
          return { user: null, state: "error" };
        default:
          const errorMessage = error.message;
          console.log(errorMessage);
          return { user: null, state: "error" };
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

export async function createStripeCustomer(req, res) {
  const { id, email, name, ccNumber, expDate, csv } = req;

  const exp_month = expDate.substring(0, 2);
  const exp_year = expDate.slice(-2);

  const customer = {
    id: id,
    email: email,
    name: name,
    card: ccNumber,
    month: exp_month,
    year: exp_year,
    csv: csv,
  };

  var customerObject = `email=${customer.email}&name=${customer.name}&card=${customer.card}&month=${customer.month}&year=${customer.year}&csv=${customer.csv}`;

  try {
    const data = await fetch(
      `https://us-central1-party-round-mag.cloudfunctions.net/createStripeCustomer?${customerObject}`,
      { mode: "cors" }
    );
    const json = await data.json();

    if (json.status == "success") {
      return Promise.resolve(json);
    } else {
      console.log("Failure");
      return Promise.resolve(json);
    }
  } catch (err) {
    console.error(`Error getting user access: ${err}`);
  }
}

export async function createFirestoreOrder(req, res) {
  try {
    const orderRef = doc(db, "volume", "mag");

    // Automically increment the order volume by 1
    await updateDoc(orderRef, {
      orders: increment(1),
    });

    await addDoc(collection(db, "orders"), req);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export function listenToOrders(setOrders) {
  const unsub = onSnapshot(doc(db, "volume", "mag"), (doc) => {
    const data = doc.data();
    const orders = data.orders;

    setOrders(orders);
  });

  return unsub;
}
