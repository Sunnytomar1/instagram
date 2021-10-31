// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPQO5Uz3wHuIpKyo_anxtGiNrh_PaB-9g",
  authDomain: "insta-1-56446.firebaseapp.com",
  projectId: "insta-1-56446",
  storageBucket: "insta-1-56446.appspot.com",
  messagingSenderId: "1097528102115",
  appId: "1:1097528102115:web:53f801527fadee2f3c09d6"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig): getApp();
const db = getFirestore();
const storage = getStorage();

export { app,db,storage };