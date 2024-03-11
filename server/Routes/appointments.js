const express  = require('express');
const router = express.Router()
const {
    GetAllAppointments,
    GetSpecifiAppointment,
    CreateAppointment,
    UpdateAppointment,
    DeletAppointment
} = require('../Controllers/appointments')

router.get('/appointments', GetAllAppointments)
router.route('/appointments/:id').post(CreateAppointment).get(GetSpecifiAppointment).patch(UpdateAppointment).delete(DeletAppointment)

module.exports = router