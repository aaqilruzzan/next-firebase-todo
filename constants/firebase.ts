import { FIREBASE_CONFIG } from "../utils/firebase";

const FIREBASE = {
  API_KEY: FIREBASE_CONFIG.apiKey,
  AUTH_DOMAIN: FIREBASE_CONFIG.authDomain,
  PROJECT_ID: FIREBASE_CONFIG.projectId,
  STORAGE_BUCKET: FIREBASE_CONFIG.storageBucket,
  MESSAGING_SENDER_ID: FIREBASE_CONFIG.messagingSenderId,
  APP_ID: FIREBASE_CONFIG.appId,
};

const firebaseConfig = {
  apiKey: FIREBASE.API_KEY,
  authDomain: FIREBASE.AUTH_DOMAIN,
  projectId: FIREBASE.PROJECT_ID,
  storageBucket: FIREBASE.STORAGE_BUCKET,
  messagingSenderId: FIREBASE.MESSAGING_SENDER_ID,
  appId: FIREBASE.APP_ID,
};

export { FIREBASE, firebaseConfig };
