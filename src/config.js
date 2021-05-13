import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDVpUEktRmZNtRU4ppUc0HYzn7172mRXCk",
    authDomain: "movie-app-87822.firebaseapp.com",
    projectId: "movie-app-87822",
    storageBucket: "movie-app-87822.appspot.com",
    messagingSenderId: "133108050681",
    appId: "1:133108050681:web:4e5044eb20d8033152d028"
  };
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, timestamp };