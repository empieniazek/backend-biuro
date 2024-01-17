const express = require('express');
const app = express();
const port = 3000;

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyDLZ2NED3LlzkqeJMVGr94RJiw8rX9cbmE",
//     authDomain: "biuro-backend.firebaseapp.com",
//     projectId: "biuro-backend",
//     storageBucket: "biuro-backend.appspot.com",
//     messagingSenderId: "887826873181",
//     appId: "1:887826873181:web:2e3815d1f34064b5e186b4",
//     measurementId: "G-BLXMEZ3R6S"
// };
//
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);


const admin = require('firebase-admin');
const serviceAccount = require('./admin-key.json');
const {getFirestore} = require("firebase-admin/firestore");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

app.get('/tours', async (req, res) => {
    const snapshot = await db.collection('toursList').get();
    const tours = [];
    snapshot.forEach(doc => {
        tours.push(doc.data());
    });
    res.send(tours);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});