// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIcEDpcKq-8Ctdx6BYbfiZMnpTZEQSM4A",
  authDomain: "machinetest-381c1.firebaseapp.com",
  projectId: "machinetest-381c1",
  storageBucket: "machinetest-381c1.appspot.com",
  messagingSenderId: "279114611745",
  appId: "1:279114611745:web:3b1c00a58690e8beb57760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app