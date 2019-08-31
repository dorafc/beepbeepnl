const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.init_user = functions
    .region('us-east1')
    .auth
    .user()
    .onCreate(async (user, context) => {
  // Get the uid and display name of the newly created user.
  var uid = user.uid;
  var displayName = user.displayName;
        const writeResult = await admin
              .firestore()
              .collection('users')
              .doc(uid)
              .set({'name': displayName})

});

exports.removeUserFromDatabase = functions
    .region('us-east1')
    .auth
    .user()
    .onDelete(function(user, context) {
  // Get the uid of the deleted user.
  var uid = user.uid;

  // Remove the user from your Realtime Database's /users node.
  return admin.database().ref("/users/" + uid).remove();
});
