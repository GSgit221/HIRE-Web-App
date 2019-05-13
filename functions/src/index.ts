import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
const usersCollection = 'job_catalogue';
// let surveyUser = {};
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
exports.job_catalogue = functions.https.onRequest(main);
export const job_catalogue = functions.https.onRequest((request, response) => {
    // response.send('Hello saadwords!');

    firebaseHelper.firestore.createNewDocument(db, usersCollection, request.body).then((data: any) => {
        request.body.message = 'new user added';
        request.body.documentID = data._path.segments[1];
        response.send(request.body);
    });
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
