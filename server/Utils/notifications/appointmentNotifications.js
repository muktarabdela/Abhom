const admin = require('firebase-admin')

const appointmentNotification = async (userToken, property, time) => {
    const message = {
        notification: {
          title: `Your Appointment has ${time} days left!`,
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

module.exports = appointmentNotification