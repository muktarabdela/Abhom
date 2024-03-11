const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const propertySchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please provide the type of property (e.g., apartment, villa)'],
    },
    title: {
        type: String,
        required: [true, 'Please provide a title for the property'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the property'],
    },
    location: {
        type: String,
        required: [true, 'Please provide the location of the property'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide the price of the property'],
    },
    size: {
        type: Number,
        required: [true, 'Please provide the size of the property'],
    },
    amenities: {
        type: [String],
    },
    images: {
        type: [String],
        required: [true, 'Please provide the images of the property'],

    },
    virtualTour: {
        type: String,
    },
    financing: {
        type: String,
        // Define the structure of the financing object based on your requirements
        // For example, if it's a mortgage, you might have fields like downPayment, interestRate, etc.
        // Adjust this according to your application's needs.
    },
    details: {
        floorPlans: {
            type: [String],
        },
        bedRooms: {
            type: Number,
        },
        restRooms: {
            type: Number,
        },
        nearby: {
            schools: [
                {
                    name: String,
                    type: String,
                    distance: Number,
                    rating: Number,
                    // Object
                }
            ],
            transportOptions: [
                {
                    name: String,
                    type: String,
                    distance: Number,
                    rating: Number,
                    // Object
                }
            ],
            shopsAndSupermarkets: [
                {
                    name: String,
                    type: String,
                    distance: Number,
                    rating: Number,
                    // Object
                }
            ],
        },
    },
    listingDate: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    geolocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    notificationSent: { type: Boolean, default: false }, // New field to track notification status
    usersWithMatchingPreferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('properties', propertySchema);
