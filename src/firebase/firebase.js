import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBEMxjiqPfLRUCS01-Y3SILzceXjD3N_X0",
  authDomain: "crwn-db-abac9.firebaseapp.com",
  databaseURL: "https://crwn-db-abac9.firebaseio.com",
  projectId: "crwn-db-abac9",
  storageBucket: "crwn-db-abac9.appspot.com",
  messagingSenderId: "377213509900",
  appId: "1:377213509900:web:cf629621823884340b6929"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot= await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user:', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;