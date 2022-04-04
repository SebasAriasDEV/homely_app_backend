const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);


//Init Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'homely.firebaseio.com'
});

const firestoreDB = getFirestore();

// const getAllUsers = async  () => {
//     const usersCollection = firestoreDB.collection('users');
//     const snapshot = await usersCollection.get();

//     snapshot.forEach((doc) => console.log(doc.data().email));


// }

//Exports
module.exports = {
    firestoreDB,
}

