import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "#",
  authDomain: "#",
  projectId: "#",
  storageBucket: "#",
  messagingSenderId: "#",
  appId: "#",
};

// Initialize Firebase
const initAuthentication = () => {
  return initializeApp(firebaseConfig);
};

const app = initAuthentication();

export const db = getFirestore(app);
export default initAuthentication;
