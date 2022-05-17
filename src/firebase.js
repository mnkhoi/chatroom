// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.CHATROOM_API_KEY,
  authDomain: process.env.CHATROOM_AUTH_DOMAIN,
  databaseURL: process.env.CHATROOM_DATABASE_URL,
  projectId: process.env.CHATROOM_PROJECT_ID,
  storageBucket: process.env.CHATROOM_STORAGE_BUCKET,
  messagingSenderId: process.env.CHATROOM_MESSAGING_SENDER_ID,
  appId: process.env.CHATROOM_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);