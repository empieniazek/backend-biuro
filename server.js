const express = require('express');
const app = express();
const port = 3000;

const admin = require('firebase-admin');
const serviceAccount = require('./admin-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const {getFirestore} = require("firebase-admin/firestore");
const cors = require("cors");

const db = getFirestore();
app.use(express.json());
app.use(cors())
require('./endpoints/tours')(app, db);
require('./endpoints/comments')(app, db);
require('./endpoints/history')(app, db);
require('./endpoints/user')(app, db);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
