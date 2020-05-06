import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

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

// const provider = new firebase.auth.GoogleAuthProvider();

// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     console.log(user)
//     console.log(token)
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });
  
  ReactDOM.render(<App />, document.getElementById('root'))