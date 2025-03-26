//  En la web de FireStore me da el siguiente codigo:

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBdRN5BTo2W9c8YnBEfqLEOxoA-Ubn4oak",
//   authDomain: "translations-a1045.firebaseapp.com",
//   projectId: "translations-a1045",
//   storageBucket: "translations-a1045.firebasestorage.app",
//   messagingSenderId: "635848880042",
//   appId: "1:635848880042:web:a0286d6cc4384e8a5585d3",
//   measurementId: "G-KJCRLK4GYR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

/////////////////////////////////////



// Codigo por chatGPT
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: "TU_API_KEY",
//   authDomain: "TU_AUTH_DOMAIN",
//   projectId: "TU_PROJECT_ID",
//   storageBucket: "TU_STORAGE_BUCKET",
//   messagingSenderId: "TU_MESSAGING_SENDER_ID",
//   appId: "TU_APP_ID"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBdRN5BTo2W9c8YnBEfqLEOxoA-Ubn4oak",
  authDomain: "translations-a1045.firebaseapp.com",
  projectId: "translations-a1045",
  storageBucket: "translations-a1045.firebasestorage.app",
  messagingSenderId: "635848880042",
  appId: "1:635848880042:web:a0286d6cc4384e8a5585d3",
  measurementId: "G-KJCRLK4GYR"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);
// const analytics = getAnalytics(app);


export { db };
