const admin = require('firebase-admin')

const infoNotification = async (userToken, information) => {
    const message = {
        notification: {
          title: `New Information Posted`,
          body: `${information.title}`,
          image: `${information.images}`
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

module.exports = infoNotification