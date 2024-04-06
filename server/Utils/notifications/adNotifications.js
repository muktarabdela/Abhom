const admin = require('firebase-admin')

const adNotification = async (userToken, title, body, image) => {
  const message = {
    notification: {
      title: title,
      body: body,
      image: image
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

module.exports = adNotification