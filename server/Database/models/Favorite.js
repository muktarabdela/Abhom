const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const FavoriteProperty = new mongoose.Schema({
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
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('FavoriteProperty', FavoriteProperty);
