const admin = require('firebase-admin')

const preferenceNotification = async (userToken, property) => {
    const message = {
        notification: {
          title: `New property Matching your Preferences!`,
          body: `${property.title}`,
          image: `${property.images[0]}`
        },
        token: userToken
      };
      //sending the push notification to devices
      admin.messaging().send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
}

module.exports = preferenceNotification