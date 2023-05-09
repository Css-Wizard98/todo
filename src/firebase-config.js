import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQAWaPL8Dd2DdWIk7gVwlwL9hOq7r25Dw",
    authDomain: "todo-d895d.firebaseapp.com",
    projectId: "todo-d895d",
    storageBucket: "todo-d895d.appspot.com",
    messagingSenderId: "692101037693",
    appId: "1:692101037693:web:0712e9d127089a5f9bfb14"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);