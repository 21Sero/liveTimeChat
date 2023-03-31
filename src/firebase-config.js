// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5wGm0dGTGUwPUWWykYqe0btNlzdAwWMs",
    authDomain: "chaater-cc240.firebaseapp.com",
    projectId: "chaater-cc240",
    storageBucket: "chaater-cc240.appspot.com",
    messagingSenderId: "686989869047",
    appId: "1:686989869047:web:604dbb4a3d0e9c93a1f8f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
