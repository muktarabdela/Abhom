const admin = require('firebase-admin')
var serviceAccount = require("../abhom-notifications-firebase-adminsdk-ht4ow-943b743f89.json")

//Initialazing the Admin for Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

const sendNotification = async ( deviceToken, body, property) => {

    const message = {
        notification: {
          title: 'Your Saved Property has been updated',
          body: `${property.title}`,
          image: `${property.images[0]}`

        },
        token: deviceToken
      };

      admin.messaging().send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });

}


module.exports = sendNotification