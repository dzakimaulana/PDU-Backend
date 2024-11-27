const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trib2-61185-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: 'trib2-61185.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = {
  bucket
};