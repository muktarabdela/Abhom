const { StatusCodes } = require("http-status-codes")
const User = require("../Database/models/User")
const adNotification = require("../Utils/notifications/adNotifications")
const { BadRequestError } = require('../errors')

const adNotifications = async (req, res) => {
    const { title, body, image } = req.body
    console.log(req.body)
    try {
        if (title && body && image) {
            const allUsers = await User.find({})
            allUsers.forEach(user => {
                adNotification(user.deviceToken, title, body, image)
            })
            res.status(StatusCodes.CREATED).json({ msg: "Ad notification successfully sent" })
        }
        else {
            throw new BadRequestError('Invalid Inputs')
        }
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "internal server error" })
    }
}

module.exports = adNotifications