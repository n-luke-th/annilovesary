// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config, emulatorsConfig } from "./firebaseConfig";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore/lite";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const LOCALHOST = "127.0.0.1";

// Initialize Firebase
const app = initializeApp(config);

const auth = getAuth(app);
const firestore = getFirestore(app);
const realtimeDb = getDatabase(app);

auth.useDeviceLanguage();

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, `http://${LOCALHOST}:${emulatorsConfig.auth.port}`);
  connectFirestoreEmulator(firestore, LOCALHOST, emulatorsConfig.firestore.port);
  connectDatabaseEmulator(realtimeDb, LOCALHOST, emulatorsConfig.database.port);
}

export { app, auth, firestore };
