const { StatusCodes } = require('http-status-codes')
const UserAppointment = require('../Database/models/Appointment')
const { CustomAPIError } = require('../errors')

const GetAllAppointments = async (req, res) => {
    try {
        const appointments = await UserAppointment.find()
        res.status(StatusCodes.OK).json({ requestedUser: req.user, appointments })

    } catch (error) {
        console.log(error);
        throw new CustomAPIError('Internal Server Error')
    }
}

const GetSpecifiAppointment = async (req, res) => {
    try {
        const appointment = await UserAppointment.findById(req.params.id);
        res.status(StatusCodes.OK).json({ requestedUser: req.user, appointment })

    } catch (error) {
        console.log(error);
        throw new CustomAPIError('Internal Server Error')
    }
}
const CreateAppointment = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const appointment = await UserAppointment.create({ ...req.body })
            res.status(StatusCodes.OK).json({ requestedUser: req.user, appointment })

        } catch (error) {
            console.log(error);
            throw new CustomAPIError('Internal Server Error')
        }
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({ role: req.user.role, message: 'Unauthorized access' })
    }
}

const UpdateAppointment = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const appointment = await UserAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(StatusCodes.OK).json({ requestedUser: req.user, appointment })

        } catch (error) {
            console.log(error);
            throw new CustomAPIError('Internal Server Error')
        }
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({ role: req.user.role, message: 'Unauthorized access' })
    }
}

const DeletAppointment = async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const appointment = await UserAppointment.findByIdAndDelete(req.params.id);
            res.status(StatusCodes.OK).json({ requestedUser: req.user, appointment })

        } catch (error) {
            console.log(error);
            throw new CustomAPIError('Internal Server Error')
        }
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).json({ role: req.user.role, message: 'Unauthorized access' })
    }
}

module.exports = {
    GetAllAppointments,
    GetSpecifiAppointment,
    CreateAppointment,
    UpdateAppointment,
    DeletAppointment
}