const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userAppointmentSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User', // Reference to the Users model
    required: [true, 'Please provide a user ID'],
  },
  propertyId: {
    type: ObjectId,
    ref: 'properties', // Reference to the PropertyListing model
    required: [true, 'Please provide a property ID'],
  },
  dateTime: {
    type: Date,
    required: [true, 'Please provide the date and time of the appointment'],
  },
  status: {
    type: String,
    enum: ['scheduled', 'canceled', 'completed'],
    default: 'scheduled',
  },
});

module.exports = mongoose.model('UserAppointment', userAppointmentSchema);