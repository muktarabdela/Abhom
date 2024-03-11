const User = require('../Database/models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
require('dotenv').config()

const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        throw new UnauthenticatedError('auth header error ')
    }
    //getting the token from the header
    const token = authHeader.split(' ')[1]
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        // Atach the user to jobs route
        req.user = {userId: payload.userID, name: payload.username}
        next()
    } catch (error) {
        console.log(error);
    }
}
module.exports = auth