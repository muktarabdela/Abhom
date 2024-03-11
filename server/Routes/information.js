const express = require('express')
const router = express.Router()
const { createInformation, getInformation, updateInformation, DeleteInformation} = require('../Controllers/information')

router.route('/informations').get(getInformation).post(createInformation)
router.route('/informations/:id').patch(updateInformation).delete(DeleteInformation)

module.exports = router
