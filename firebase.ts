import { getApp,getApps,initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBCeemyU3X7JiJN9VsYdQkd6FXvpce0U54",
    authDomain: "chat-with-pdf-challenge-c96ff.firebaseapp.com",
    projectId: "chat-with-pdf-challenge-c96ff",
    storageBucket: "chat-with-pdf-challenge-c96ff.appspot.com",
    messagingSenderId: "156585609095",
    appId: "1:156585609095:web:adb7522e29b6e3de837522",
    measurementId: "G-ZKTJZWTMSY"
};

const app=getApps().length===0?initializeApp(firebaseConfig):getApp();

const db=getFirestore(app);
const storage=getStorage(app);

export {db,storage};
