import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs,serverTimestamp, query, orderBy, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL , uploadBytes, } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyDnjNRjq583w2mqTLEPEgItZkUrHVN7SBA",
    authDomain: "first-frontend-project-da025.firebaseapp.com",
    projectId: "first-frontend-project-da025",
    storageBucket: "first-frontend-project-da025.appspot.com",
    messagingSenderId: "796702314001",
    appId: "1:796702314001:web:d4a8041c80b87c69b36bb0",
    measurementId: "G-JJGJY0FBXM"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {app, auth,onAuthStateChanged,
     createUserWithEmailAndPassword, signInWithEmailAndPassword, db,
    collection,
    addDoc,
    doc,
    setDoc,
    signOut,
    getDoc,
    updateEmail,
    sendEmailVerification,
    getDocs,
    storage,
     ref,
      uploadBytesResumable,
       getDownloadURL,
       uploadBytes,
       serverTimestamp,
       query,
     orderBy,
     deleteDoc
}
