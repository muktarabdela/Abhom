const { stringify } = require("yamljs");
const propertySchema = require("../Database/models/Property");
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const SearchProperty = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            throw new BadRequestError('Invalid Inputs');
        }

        const properties = await searchProperties(search);
        res.status(StatusCodes.OK).json({ success: true, results: properties.length, properties });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

const searchProperties = async (search) => {
    if (search && isNaN(search)) {
        const stringifiedSearch = search.toString();
        const regex = new RegExp(`.*${stringifiedSearch}.*`, 'i');
        const searchQuery = buildSearchQuery(regex);
        const properties = await propertySchema.find(searchQuery);
        return properties;
    } else {
        throw new BadRequestError('Invalid Inputs');
    }
};

const buildSearchQuery = (regex) => {
    return {
        $or: [
            { type: { $regex: regex } },
            { title: { $regex: regex } },
            { description: { $regex: regex } },
            { location: { $regex: regex } },
            { amenities: { $regex: regex } },
            { 'details.nearby.schools': { $regex: regex } },
            { 'details.nearby.transportOptions': { $regex: regex } },
            { 'details.nearby.schools.shopsAndSupermarkets': { $regex: regex } },
        ]
    };
};

module.exports = {
    SearchProperty
};
