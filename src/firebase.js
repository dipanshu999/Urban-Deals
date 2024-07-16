import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8drUiYykmXIxnoFX7MyAihP0VPu3bPDA",
  authDomain: "fakestore-apis.firebaseapp.com",
  projectId: "fakestore-apis",
  storageBucket: "fakestore-apis.appspot.com",
  messagingSenderId: "291922382720",
  appId: "1:291922382720:web:b16c3fd24eafb49e5b7b65",
  measurementId: "G-V4Z730DFG6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
