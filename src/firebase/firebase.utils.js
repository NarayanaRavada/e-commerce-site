import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDXBhMR8XQntkSulD3-mSQcTRP-4gi7fBU",
  authDomain: "e-commercesite-1e8ce.firebaseapp.com",
  projectId: "e-commercesite-1e8ce",
  storageBucket: "e-commercesite-1e8ce.appspot.com",
  messagingSenderId: "1054566607125",
  appId: "1:1054566607125:web:7897dfea01ffa98192211c",
  measurementId: "G-R4LCYWEFV0",
};

const firebase = initializeApp(config);

export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdOn = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdOn,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err);
    }
  }

  return userRef;
};

export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInwitheEmailPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

export default firebase;
