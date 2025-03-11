import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2M6sInTVJ7l8ETYGjwvDSM4cMU0IKLos",
    authDomain: "nsave-hackathon.firebaseapp.com",
    projectId: "nsave-hackathon",
    storageBucket: "nsave-hackathon.firebasestorage.app",
    messagingSenderId: "1073188375480",
    appId: "1:1073188375480:web:87b0d381be4b9c3cba9d4d",
    measurementId: "G-QRGJX459WQ"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
