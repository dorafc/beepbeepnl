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
      .set({ 'name': displayName })
    return writeResult;
  });

exports.removeUserFromDatabase = functions
  .region('us-east1')
  .auth
  .user()
  .onDelete(async (user, context) => {
    // Get the uid of the deleted user.
    var uid = user.uid;

    // Remove the user from your Realtime Database's /users node.
    const result = await admin
      .firestore
      .collection('users')
      .doc(uid)
      .delete()
    return result
  });

exports.clearOldRides = functions
  .region('us-east1')
  .firestore
  .document('rides/{ride}').onCreate(async (new_ride, context) => {
    await admin
      .firestore()
      .collection('rides')
      .where('driver',
        '==',
        new_ride.get('driver')
      ).get()
      .then((qs) => {
        return qs.forEach(async (doc) => {
          const id = doc.id;
          if (id === new_ride.id) {
            return
          }
          else if (doc.get('toLab') === new_ride.get('toLab')) {
            await admin.firestore().collection('rides').doc(id).delete()
            return
          }
          return
        })
      })
  }
  )