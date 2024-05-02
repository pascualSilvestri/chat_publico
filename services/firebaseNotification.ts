// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTGofZPPt4KmUmONL3TgFkhvBDvrZnWdI",
  authDomain: "chat-de-prueba-aff60.firebaseapp.com",
  projectId: "chat-de-prueba-aff60",
  storageBucket: "chat-de-prueba-aff60.appspot.com",
  messagingSenderId: "709184771035",
  appId: "1:709184771035:web:058679168c60a0211d8dfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
getToken(messaging, {
    vapidKey:"6NRlpap0lXi3I3HtUCal6q7YwDPuJ-Yn9-Y-9PA7qh8"
})