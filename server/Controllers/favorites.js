const FavoriteProperty = require("../Database/models/Favorite");
const User = require("../Database/models/User");
const { BadRequestError, UnauthenticatedError, CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes');
const propertySchema = require("../Database/models/Property")

const saveFavoriteProperty = async (req, res) => {
    try {
        const { userId, propertyId } = req.body;
        if (!userId || !propertyId) {
            return res.status(400).json({ error: 'User ID and Property ID are required.' });
        }
        const userExists = await User.findById(userId);
        const propertyExists = await propertySchema.findById(propertyId);

        if (!userExists || !propertyExists) {
            return res.status(404).json({ error: 'User or Property not found.' });
        }
        // Create a new FavoriteProperty instance
        const favoriteProperty = new FavoriteProperty({
            userId,
            propertyId,
        });
        // Save the favorite property to the database
        const savedFavoriteProperty = await favoriteProperty.save();
        // Send a success response
        res.status(201).json({
            success: true,
            favoriteProperty: savedFavoriteProperty,
        });
    } catch (error) {
        console.error('Error in saveFavoriteProperty:', error);

        throw new CustomAPIError('Internal Server Error')
    }
}

const getFavoriteProperties = async (req, res) => {
    try {
        const savedProperties = await FavoriteProperty.find({})
            //.populate('propertyId');
        res.status(StatusCodes.OK).json({ savedProperties });
    } catch (error) {
        console.error('Error in getSavedProperties:', error);
        throw new CustomAPIError('Internal Server Error');
    }
};

// fetching favourite properties for users by there id
const getFavoritePropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const savedProperty = await FavoriteProperty.find({ userId: id })
            //.populate('propertyId');
        if (!savedProperty) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Saved property not found' });
        }
        res.status(StatusCodes.OK).json({ savedProperty });
    } catch (error) {
        console.error('Error in getSavedPropertyById:', error);
        throw new CustomAPIError('Internal Server Error');
    }
};


const deleteFavoritePropertyById = async (req, res) => {
    try {
        const result = await FavoriteProperty.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Saved property not found for deletion' });
        }
        res.status(StatusCodes.OK).json({ msg: 'Saved property deleted successfully', result });
    } catch (error) {
        console.error('Error in deleteFavoritePropertyById:', error);
        throw new CustomAPIError('Internal Server Error');
    }
};




module.exports = {
    saveFavoriteProperty,
    getFavoritePropertyById,
    getFavoriteProperties,
    deleteFavoritePropertyById

}
