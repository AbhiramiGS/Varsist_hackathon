// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-LX0qSP6uXLiaqC8CRIbu82vYMdDQSyc",
  authDomain: "springsense.firebaseapp.com",
  databaseURL:
    "https://springsense-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "springsense",
  storageBucket: "springsense.appspot.com",
  messagingSenderId: "499013971348",
  appId: "1:499013971348:web:9c2ad5234610c5d62bf381",
  measurementId: "G-BG5X4TZ27Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const usersRef = ref(database, "/MQ135&Temp");
const waterRef = ref(database, "/WaterQualityResearch1");

// eslint-disable-next-line
onValue(usersRef, (snapshot) => {});

// eslint-disable-next-line
onValue(waterRef, (snapshot) => {});

export default database;
