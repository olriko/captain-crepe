import * as functions from 'firebase-functions'

export const helloWorld = functions.https.onRequest(async (request, response) => {
    response.send('Hello from Firebase!\n\n');
});