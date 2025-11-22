import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKh7fCZ2WZKWjPknPhu_cmt4r-3Z-xP1E",
  authDomain: "fill-in-f014d.firebaseapp.com",
  projectId: "fill-in-f014d",
  storageBucket: "fill-in-f014d.firebasestorage.app",
  messagingSenderId: "231096505140",
  appId: "1:231096505140:web:2627ad679d80bd1a948b61",
  measurementId: "G-J9NSLZY1J6",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
