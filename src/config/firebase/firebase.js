import { initializeApp } from "firebase/app";
import "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMfi0NIIAGPp2ULLa_sCry6csoPTeSr_4",
  authDomain: "autenticacao-38dd7.firebaseapp.com",
  projectId: "autenticacao-38dd7",
  storageBucket: "autenticacao-38dd7.appspot.com",
  messagingSenderId: "462353028770",
  appId: "1:462353028770:web:ceecf8cea0f85803d929fb",
  measurementId: "G-WS3GY2R5DC"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);

  export default db