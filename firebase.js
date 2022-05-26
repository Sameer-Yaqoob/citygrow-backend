const admin = require("firebase-admin");
const serviceAccount = require(`${process.env.FIREBASE_PRIVATE_KEY_PATH}`);
const { getFirestore } = require('firebase-admin/firestore');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports = { admin, db };