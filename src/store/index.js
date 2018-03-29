import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'
import { city } from './reducers'

const firebaseConfig = {
  apiKey: "AIzaSyDjQCrS3fWOqGHgqAemooMPG4s2PsfBkhs",
  authDomain: "pandemic-5c562.firebaseapp.com",
  databaseURL: "https://pandemic-5c562.firebaseio.com",
  projectId: "pandemic-5c562",
  storageBucket: "pandemic-5c562.appspot.com",
  messagingSenderId: "323351837496"
} // from Firebase Console

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, firebaseConfig),
  reduxFirestore(firebase) // firebase instance as first argument
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  city
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

export default store