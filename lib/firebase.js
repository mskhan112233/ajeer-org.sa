import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration provided from Firebase Console
export const firebaseConfig = {
  apiKey: "AIzaSyCBZ3-gkKyGNs152kNM3JXjOBrhveOO7Do",
  authDomain: "ajeer-site-c586b.firebaseapp.com",
  projectId: "ajeer-site-c586b",
  storageBucket: "ajeer-site-c586b.firebasestorage.app",
  messagingSenderId: "377051073059",
  appId: "1:377051073059:web:1e038df6a2db1e2c737f96",
  measurementId: "G-7D23KJX2BJ"
};

// Initialize Firebase safely for Next.js SSR & Client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Analytics (only supported in browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) => {
      isSupported().then((yes) => {
        if (yes) {
          analytics = getAnalytics(app);
        }
      });
    })
    .catch(() => {});
}

export { app, db, analytics };
