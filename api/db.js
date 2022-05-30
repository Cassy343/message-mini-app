// Import the functions you need from the SDKs you need
const firebaseApp = require('firebase/app');
const firestore = require('firebase/firestore');
require('dotenv').config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);
const userIdToUser = {};

function flattenDoc(dc) {
    return {
        ...dc.data(),
        id: dc.id
    };
}

async function flattenMessage(dc) {
    const msg = flattenDoc(dc);
    msg.author = await getUser(msg.author.id);
    return msg;
}

function sortByDate(messageA, messageB) {
    return messageA.timeSent < messageB.timeSent
        ? -1
        : (messageA.timeSent > messageB.timeSent ? 1 : 0);
}

async function getUser(id) {
    if (userIdToUser[id]) {
        return userIdToUser[id];
    }

    const dc = await firestore.getDoc(firestore.doc(db, 'users', id));
    const res = flattenDoc(dc);
    userIdToUser[id] = res;
    return res;
}

async function getUserByName(name) {
    const q = firestore.query(
        firestore.collection(db, 'users'),
        firestore.where('name', '==', name)
    );

    const docsRes = await firestore.getDocs(q).then(docs => docs.docs);

    if (docsRes.length == 1) {
        return flattenDoc(docsRes[0]);
    } else {
        return null;
    }
}

async function makeUser(name) {
    const userDoc = await firestore.addDoc(firestore.collection(db, 'users'), {
        name: name
    });
    return {
        name: name,
        id: userDoc.id
    };
}

async function getAllMessages() {
    const docsRes = await firestore.getDocs(firestore.collection(db, 'messages'));
    return Promise.all(docsRes.docs.map(dc => flattenMessage(dc)))
        .then(msgs => msgs.sort(sortByDate));
}

async function makeMessage(authorId, content, timeSent) {
    const message = {
        content: content,
        author: firestore.doc(db, 'users', authorId),
        lastEdited: null,
        timeSent: timeSent
    };
    const messageDoc = await firestore.addDoc(firestore.collection(db, 'messages'), message);
    message.author = await getUser(authorId);
    message.id = messageDoc.id;
    return message;
}

async function updateMessage(id, newContent, timeEdited) {
    return await firestore.updateDoc(firestore.doc(db, 'messages', id), {
        content: newContent,
        lastEdited: timeEdited
    });
}

async function deleteMessage(id) {
    return await firestore.deleteDoc(firestore.doc(db, 'messages', id));
}

async function getReplies(id) {
    const docsRes = await firestore.getDocs(
        firestore.doc(db, 'messages', id).collection('replies')
    );
    return Promise.all(docsRes.docs.map(dc => flattenMessage(dc)))
        .then(msgs => msgs.sort(sortByDate));
}

async function makeReply(authorId, messageId, content, timeSent) {
    const message = {
        content: content,
        author: firestore.doc(db, 'users', authorId),
        lastEdited: null,
        timeSent: timeSent
    };
    const messageDoc = await firestore.addDoc(
        firestore.doc(db, 'messages', messageId)
            .collection('replies'),
        message
    );
    message.author = await getUser(authorId);
    message.id = messageDoc.id;
    return message;
}

module.exports = {
    getUser,
    getUserByName,
    makeUser,
    getAllMessages,
    makeMessage,
    updateMessage,
    deleteMessage,
    getReplies,
    makeReply
};
