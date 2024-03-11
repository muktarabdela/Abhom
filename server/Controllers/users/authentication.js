const User = require('../../Database/models/User')
const {StatusCodes} = require('http-status-codes')
const  {BadRequestError, UnauthenticatedError}  = require('../../errors')
const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {fullname: user.fullname,username: user.username}, token })
}

const login = async (req, res) => {
    const { username, password, phone } = req.body
    if( !password || !phone || !username) 
    {
        throw new BadRequestError('Please Provide the mandatory Inputs!')
    }
    const user = await User.findOne({ phone: phone})
    if(!user)
    {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    //comapre pasword
    const isPasswodCorrect = await user.comparePassword(password)
    if(!isPasswodCorrect)
    {
        throw new UnauthenticatedError('Incorrect Password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.username}, token})
}

module.exports = {
    register,
    login
}