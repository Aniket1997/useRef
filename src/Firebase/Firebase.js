// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyA1nQcB1cxO5dRyOECLd9nH21hMYfGLyQo",
  authDomain: "shopping-fc0d9.firebaseapp.com",
  databaseURL: "https://shopping-fc0d9-default-rtdb.firebaseio.com",
  projectId: "shopping-fc0d9",
  storageBucket: "shopping-fc0d9.appspot.com",
  messagingSenderId: "966160488393",
  appId: "1:966160488393:web:fbf4bca98a0d0c8f82fa18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}