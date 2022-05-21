// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCILSegdHjgPuAA4-3Y_cxW6AM7ssB0Lrs",
  authDomain: "pointcloudloader.firebaseapp.com",
  projectId: "pointcloudloader",
  storageBucket: "pointcloudloader.appspot.com",
  messagingSenderId: "564658683987",
  appId: "1:564658683987:web:1de4388346ff1f037ec6a6",
  measurementId: "G-NKSK0KCXTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
