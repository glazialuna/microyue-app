import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { listUsersResult, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9WtatY3WqtSHuqscs6QJnU6eBFjVlQN8",
    authDomain: "microyue-app.firebaseapp.com",
    databaseURL: "https://microyue-app-default-rtdb.firebaseio.com",
    projectId: "microyue-app",
    storageBucket: "microyue-app.appspot.com",
    messagingSenderId: "334859925097",
    appId: "1:334859925097:web:ca0a28355b55780bb3d4f8",
    measurementId: "G-B2JDM9XFHK"
  };
  

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

// Update date to firebase
export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

// Firebase authentication
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  const [isAdmin, isLoading, error] =  useDbData(`/admins/${user?.uid}`);

  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user, isAdmin];
};


export const listAllUsers = (nextPageToken) => {
  const users = [];
  // users = getAuth(firebase).listUsersResult();
  // List batch of users, 1000 at a time.
  // getAuth(firebase)
  //   .listUsers(1000, nextPageToken)
  //   .then((listUsersResult) => {
  //     listUsersResult.users.forEach((userRecord) => {
  //       console.log('user', userRecord.toJSON());
  //     });
  //     if (listUsersResult.pageToken) {
  //       // List next batch of users.
  //       listAllUsers(listUsersResult.pageToken);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log('Error listing users:', error);
  //   });
  return users;
};



