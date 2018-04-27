import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDjQCrS3fWOqGHgqAemooMPG4s2PsfBkhs',
  authDomain: 'pandemic-5c562.firebaseapp.com',
  databaseURL: 'https://pandemic-5c562.firebaseio.com',
  projectId: 'pandemic-5c562',
  storageBucket: 'pandemic-5c562.appspot.com',
  messagingSenderId: '323351837496'
}; // from Firebase Console

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, firebaseConfig), //abstract the need to create our own pub/sub for firebase/firestore
  reduxFirestore(firebase) // firebase instance as first argument, connects us to the actual data within the firestore, needed only if using firestore, not firebase
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

export default store;
