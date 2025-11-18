
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_JiCRcG6bePxOUptONjykGS1_lR5-LLk",
    authDomain: "todo-app-22af1.firebaseapp.com",
    projectId: "todo-app-22af1",
    storageBucket: "todo-app-22af1.firebasestorage.app",
    messagingSenderId: "630280926911",
    appId: "1:630280926911:web:df30c591d2fb5dc31a380a",
    measurementId: "G-G7G51FPX2N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }

