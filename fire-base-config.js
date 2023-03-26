import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    
    apiKey: "AIzaSyCWErGT1JkNrBitojFIypbMUJBhCQ9jd_g",
    authDomain: "customers-42d11.firebaseapp.com",
    projectId: "customers-42d11",
    storageBucket: "customers-42d11.appspot.com",
    messagingSenderId: "227159758180",
    appId: "1:227159758180:android:8fdf97613f65dc0d401671",
    measurementId: "G-5DSKMJQEQH",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase};