const Users = require('../../Database/models/User')
const { StatusCodes } = require('http-status-codes')

const getAllUsers = async (req, res) => {
    const users = await Users.find({})
    res.status(StatusCodes.OK).json({msg: "all users", number: users.length, users})
} 
const specificUser = async (req, res) => {
    const user = await Users.findOne({_id: req.params.id})
    res.status(StatusCodes.OK).json({msg: "specific user", user})
} 

module.exports = {getAllUsers, specificUser}