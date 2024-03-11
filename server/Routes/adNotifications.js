const express = require('express')
const router = express.Router()
const adNotifications = require('../Controllers/adNotifications')

router.post('/adNotification', adNotifications)
module.exports = router