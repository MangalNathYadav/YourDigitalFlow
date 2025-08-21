// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmNCg2Pq8VX2Nu3LdILTDK3M_P3e7DuNU",
    authDomain: "portofoliomghacker-main.firebaseapp.com",
    databaseURL: "https://portofoliomghacker-main-default-rtdb.firebaseio.com",
    projectId: "portofoliomghacker-main",
    storageBucket: "portofoliomghacker-main.firebasestorage.app",
    messagingSenderId: "68077005880",
    appId: "1:68077005880:web:eb15f21bc1a062b6aa0acd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
