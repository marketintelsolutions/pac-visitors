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
const visitsRef = collection(db, "visits");

async function getVisits() {
  const visitsCol = collection(db, "visits");

  const citySnapshot = await getDocs(visitsCol);
 
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
async function getVisitor(id) {
  const docRef = doc(db, "visitors", id);
  const docSnap = await getDoc(docRef);
  let visitor: (Visitor | null) =null
  if (docSnap.exists()) {
    visitor =docSnap.data() as Visitor
  }
  return visitor
}
const addFeedback = async (data: Visit) => {
  
  await addDoc(collection(db, "feedbacks"), data)
    .then((c) => {
      
      return data;
    })
    .catch((error) => {
      
      return null;
    });
};
const generateFirebaseId = (path: string)=>{
  const ref = doc(collection(db, path));
  return ref.id
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
  const id = await generateFirebaseId('visits')
  await setDoc(doc(visitsRef, id), {...data,id})
    .then((c) => {
      
      return {...data, id};
    })
    .catch((error) => {
      return null;
    });
};
const addVisitor = async (data: Visitor) => {
  
  await setDoc(doc(visitorsRef, data.id), {...data,})
    .then((c) => {
      const co: Visitor={...data}
      return co;
    })
    .catch((error) => {
      return null;
    });
};

export { getVisitor,getVisitors, addVisitor, addVisit, addFeedback,getVisits,generateFirebaseId,updateVisit };
