const cron = require('node-cron');
const User = require('../../Database/models/User')
const Property = require('../../Database/models/Property')
const UserAppointment = require('../../Database/models/Appointment');
const appointmentNotification = require('../../Utils/notifications/appointmentNotifications');

// Schedule a task to run every day at a specific time
cron.schedule('0 9 */3 * *', async () => {
  try {
    // Find appointments scheduled for 1 week from now
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    const oneWeekAppointments = await UserAppointment.find({ appointedTime: { $lte: oneWeekFromNow } });

    // Send notifications for appointments with 1 week left
    for (const appointment of oneWeekAppointments) {
      //  finding the user who creat an appointment
      const user = await User.findById(appointment.userId);
      const property = await Property.findById(appointment.propertyId);
      if (user && property) {
        if (appointment.status === 'scheduled') {
          // Get the current date
          const currentDate = new Date()
          const appointmentDate = new Date(appointment.appointedTime)
          const timeDifference = appointmentDate.getTime() - currentDate.getTime()
          const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
          // Send notification to user
          if (remainingDays > 0) {
            appointmentNotification(user.deviceToken, property, remainingDays)
          }
        }
      }
    }

  } catch (error) {
    console.error('Error scheduling appointments:', error);
  }
});

