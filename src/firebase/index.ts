// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { Visit, Visitor } from "../models";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const visitorsRef = collection(db, "visitors");

async function getVisitors() {
  const visitorsCol = collection(db, "visitors");
  const citySnapshot = await getDocs(visitorsCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
const addVisit = async (data: Visit) => {
  await addDoc(collection(db, "visits"), data)
    .then((c) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
};
const addVisitor = async (data: Visitor) => {
  await setDoc(doc(visitorsRef, data.email), data)
    .then((c) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
};

export { getVisitors, addVisitor, addVisit };
