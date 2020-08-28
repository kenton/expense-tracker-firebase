import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyC1YDDdadPppGvoM_rd7tv_b7PBjHPkSy4",
  authDomain: "expense-tracker-61259.firebaseapp.com",
  databaseURL: "https://expense-tracker-61259.firebaseio.com",
  projectId: "expense-tracker-61259",
  storageBucket: "expense-tracker-61259.appspot.com",
  messagingSenderId: "738107771483",
  appId: "1:738107771483:web:7d3f2dd435329b86700d7e"
};

firebase.initializeApp(config);

window.firebase = firebase;

export const firestore = firebase.firestore();
export default firebase;
