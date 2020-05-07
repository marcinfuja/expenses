
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
// import * as firebaseui from 'firebaseui'

const firebaseConfig = {
    apiKey: "AIzaSyBf8aHjjkjpqGHcvtaqD_Fyz8gAP0XlGzc",
    authDomain: "expenses-59516.firebaseapp.com",
    databaseURL: "https://expenses-59516.firebaseio.com",
    projectId: "expenses-59516",
    storageBucket: "expenses-59516.appspot.com",
    messagingSenderId: "552279542995",
    appId: "1:552279542995:web:022479e736df5557555826"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export {
    firebase,
    provider,
    auth
}