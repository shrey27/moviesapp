import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAkEpciL9OaFwjcavCupnk8czguCnDn9O8",
    authDomain: "todo-firebase-app-90dff.firebaseapp.com",
    projectId: "todo-firebase-app-90dff",
    storageBucket: "todo-firebase-app-90dff.appspot.com",
    messagingSenderId: "191778831599",
    appId: "1:191778831599:web:a6a57fb57652aceed32f1a"
  };
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, timestamp };