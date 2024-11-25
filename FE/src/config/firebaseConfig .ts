// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCAVDmrFF4eZxmvyHrwM8pMt1fBUJkQnTk",
	authDomain: "e-commerce-1a6be.firebaseapp.com",
	projectId: "e-commerce-1a6be",
	storageBucket: "e-commerce-1a6be.appspot.com",
	messagingSenderId: "650391879824",
	appId: "1:650391879824:web:d0289fb31d50a5776ed815",
	measurementId: "G-ELZFHM8XXJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
