const propertySchema = require("../Database/models/Property")
const UserAppointment = require("../Database/models/Appointment")
const FavoriteProperty = require("../Database/models/Favorite")
const User = require('../Database/models/User')
const sendNotification = require("../Utils/notifications/sendUpdateNotification")
const { BadRequestError, UnauthenticatedError, CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const preferenceNotification = require("../Utils/notifications/PreferenceNotification")
const Favorite = require("../Database/models/Favorite")

const AddProperty = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const newProperty = await propertySchema.create({ ...req.body });
            const allUsers = await User.find();
            // Filter users with matching preferences
            const usersWithMatchingPreferences = allUsers.filter(user => {
                const preferences = user.profile.preferences;
                const locationMatch = preferences.location === newProperty.location;
                const sizeMatch = preferences.size === newProperty.size;
                // Simplified priceRangeMatch condition
                const priceRangeMatch = (
                    preferences.priceRange.from <= newProperty.price &&
                    preferences.priceRange.upto >= newProperty.price
                );
                const amenitiesMatch = newProperty.amenities.every(amenity =>
                    preferences.amenities.includes(amenity)
                );
                console.log(`User ${user._id} Preferences:`, preferences);
                console.log('Location Match:', locationMatch);
                console.log('Price Range Match:', priceRangeMatch);
                console.log('Size Match:', sizeMatch);
                console.log('Amenities Match:', amenitiesMatch);
                return locationMatch || priceRangeMatch || sizeMatch || amenitiesMatch;
            });
            // Update property with matching users
            newProperty.usersWithMatchingPreferences = usersWithMatchingPreferences.map(user => user._id);
            await newProperty.save();
            // Send notifications to matching users
            usersWithMatchingPreferences.forEach(user => {
                preferenceNotification(user.deviceToken, newProperty);
            });
            res.status(201).json({ success: true, property: newProperty });
        } catch (error) {
            console.error(error);
            throw new CustomAPIError('Internal Server Error')
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ role: req.user.role, message: 'Unauthorized access' });
    }
}
const PropertyListings = async (req, res) => {
    try {
        const properties = await propertySchema.find(req.query);
        res.status(StatusCodes.OK).json({ role: req.user.role, message: 'Properties listed successfully', properties });
    } catch (error) {
        throw new CustomAPIError('Internal Server Error')
    }
}
const specificProperty = async (req, res) => {
    try {
        const property = await propertySchema.findOne({ _id: req.params.id });
        res.status(StatusCodes.OK).json({ requestingUser: req.user, message: 'Property listed successfully', property });
    } catch (error) {
        throw new CustomAPIError('Internal Server Error')
    }
}
const UpdateProperty = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const property = await propertySchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
            const allFavourites = await Favorite.find({});
            const favsMatchingUpdated = allFavourites.filter(fav => fav.propertyId.equals(property._id));
            // Extract user ids from favsMatchingUpdated array
            const userIds = favsMatchingUpdated.map(fav => fav.userId);
            // Find users based on extracted user ids
            const usersSavingTheProp = await User.find({ _id: { $in: userIds } });

            if (property) {
                res.status(StatusCodes.OK).json({ requestingUser: req.user, message: 'Property updated successfully', property });
                usersSavingTheProp.forEach(user => { sendNotification(user.deviceToken, req.body, property) })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ error: 'Property not found' });
            }
        } catch (error) {
            console.error(error);
            throw new CustomAPIError('Internal Server Error')
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ role: req.user.role, message: 'Unauthorized access' });

    }

}
const DeleteProperty = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const appointment = await UserAppointment.findByIdAndDelete(req.params.id);
            const favourite = await FavoriteProperty.findByIdAndDelete(req.params.id);
            const property = await propertySchema.findByIdAndDelete(req.params.id);

            if (property) {
                res.status(StatusCodes.OK).json({ requestingUser: req.user, message: 'Property deleted successfully', property });
            } else {
                // Check if any of the documents exist and send appropriate response
                if (appointment || favourite) {
                    res.status(StatusCodes.OK).json({ requestingUser: req.user, message: 'Property deleted successfully', property: null });
                } else {
                    res.status(StatusCodes.NOT_FOUND).json({ error: 'Property not found' });
                }
            }
        } catch (error) {
            console.error(error);
            throw new CustomAPIError('Internal Server Error')
        }
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({ role: req.user.role, message: 'Unauthorized access' });
    }
};
module.exports = {
    AddProperty,
    PropertyListings,
    UpdateProperty,
    DeleteProperty,
    specificProperty
}
