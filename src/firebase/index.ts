// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,updateDoc
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

async function getVisits() {
  const visitsCol = collection(db, "visits");

  const citySnapshot = await getDocs(visitsCol);
  console.log({citySnapshot:citySnapshot.docs.map(d=>d.id)});
  
  const cityList = citySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id:doc.id
    }
  });
  return cityList;
}
async function getVisitors() {
  const visitorsCol = collection(db, "visitors");
  const citySnapshot = await getDocs(visitorsCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
const addFeedback = async (data: Visit) => {
  console.log({data});
  
  await addDoc(collection(db, "feedbacks"), data)
    .then((c) => {
      console.log({c});
      
      return data;
    })
    .catch((error) => {
      console.log({error});
      
      return null;
    });
};
const generateFirebaseId = (path: string)=>{

  const ref =  collection;
  return ref
}
const updateVisit = async (data: Visit,id:string) => {
  const visitDocRef = doc(db, "visits", id);
  await updateDoc(visitDocRef, data).then((c) => {
    return data;
  })
  .catch((error) => {
    return null;
  });;
};
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

export { getVisitors, addVisitor, addVisit, addFeedback,getVisits,generateFirebaseId,updateVisit };
