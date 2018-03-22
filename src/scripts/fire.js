import firebase from 'firebase'

const init = () => {
  const config = {
    apiKey: "AIzaSyDjQCrS3fWOqGHgqAemooMPG4s2PsfBkhs",
    authDomain: "pandemic-5c562.firebaseapp.com",
    databaseURL: "https://pandemic-5c562.firebaseio.com",
    projectId: "pandemic-5c562",
    storageBucket: "pandemic-5c562.appspot.com",
    messagingSenderId: "323351837496"
  };
  firebase.initializeApp(config);
  firebase.database()
}

export default init;
