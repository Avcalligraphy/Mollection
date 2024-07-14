import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDHAj-nfSG9VJ07QhIpUk2lEUVR3w-Ynmo",
  authDomain: "molection4.firebaseapp.com",
  databaseURL: "https://molection4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "molection4",
  storageBucket: "molection4.appspot.com",
  messagingSenderId: "92284057570",
  appId: "1:92284057570:web:bdfdaa85dfafbd6e23ebbb"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
