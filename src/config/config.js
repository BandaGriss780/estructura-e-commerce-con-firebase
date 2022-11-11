// import * as firebase from 'firebase'
// import 'firebase/storage';
// import 'firebase/firestore';
// import 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCMtFkHls6jYWE1W7MsgvcOejijnszK34s",
  authDomain: "avalith-project.firebaseapp.com",
  projectId: "avalith-project",
  storageBucket: "avalith-project.appspot.com",
  messagingSenderId: "708689865763",
  appId: "1:708689865763:web:c9dd239de5c233bb9dd596"
};


// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();

// export { auth, db, storage }

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);