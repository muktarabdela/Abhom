const { default: mongoose } = require('mongoose')
const InformationSchema = require('../Database/models/Information')
const { StatusCodes } = require('http-status-codes')

const createInformation = async ( req, res) => {
    try {
        const information = await InformationSchema.create({...req.body})
        res.status(StatusCodes.CREATED).json({msg: 'information created successfully', information})
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

const getInformation = async ( req, res) => {
    try {
        const {contentType, title, postDate} = req.query
        const queryObject = {}
        if(contentType)
        {
            queryObject.contentType = contentType
        }
        if(title)
        {
            queryObject.title = {$regex: title, $options: 'i'}
        }
        if(postDate)
        {
            if(postDate === 'oneWeek')
            {
                const oneWeek = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)) // Subtracting 7 days from the current date
                queryObject.postDate = { $gte: oneWeek }
            }
            else if(postDate === 'oneMonth')
            {
                const oneMonth = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) // Subtracting 30 days from the current date
                queryObject.postDate = { $gte: oneMonth }
            }
            else if(postDate === 'sixMonth')
            {
                const sixMonths = new Date(Date.now() - (6 * 30 * 24 * 60 * 60 * 1000)); // Subtracting 6 months from the current date
                queryObject.postDate = { $gte: sixMonths }
            }
            else if( postDate === 'oneYear')
            {
                const oneYear = new Date(Date.now() - (365 * 24 * 60 * 60 * 1000)) // Subtracting one year from the current date
                queryObject.postDate = { $gte: oneYear }
            }
        }
        const information = await InformationSchema.find(queryObject )
        res.status(StatusCodes.CREATED).json({msg: 'Information imported successfully', results: information.length, information})
        
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }

}

const updateInformation = async (req, res) => {
    try {
        const { id } = req.params
        const { ...updateData } = req.body;
        // Validate the ObjectID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ObjectID format' });
        }
        // Update information based on ObjectID
        const updatedInformation = await InformationSchema.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedInformation) {
            return res.status(404).json({ message: 'Information not found' });
        }
        res.status(StatusCodes.OK).json({ updatedInformation });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}
const DeleteInformation = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate the ObjectID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid ObjectID format' });
        }
        // Delete information based on ObjectID
        const deletedInformation = await InformationSchema.findByIdAndDelete(id);
        if (!deletedInformation) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Information not found' });
        }
        res.status(StatusCodes.OK).json({ message: 'Information deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createInformation,
    getInformation,
    updateInformation,
    DeleteInformation
}
