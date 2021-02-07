import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-9PJpttQg9UIZgJk8PN802hAFs0I4sh8",
    authDomain: "crud-react-80c4c.firebaseapp.com",
    projectId: "crud-react-80c4c",
    storageBucket: "crud-react-80c4c.appspot.com",
    messagingSenderId: "1163107395",
    appId: "1:1163107395:web:d45a701399d976e77888f6"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();