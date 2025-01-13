import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkcAD84odc3RBPfTbHla3sR4Thy_pABjQ",
  authDomain: "you-6bddf.firebaseapp.com",
  projectId: "you-6bddf",
  storageBucket: "you-6bddf.firebasestorage.app",
  messagingSenderId: "687179357601",
  appId: "1:687179357601:web:18f0ef3c5dbcddf946bfe0",
  measurementId: "G-ZY1SP3PVZS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, db, analytics };