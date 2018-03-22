import { createStore, combineReducers, compose } from 'redux'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'

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
firebase.database()
// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // firebase instance as first argument
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer
})

// Create store with reducers and initial state
const initialState = {}
export default createStoreWithFirebase(rootReducer, initialState)
