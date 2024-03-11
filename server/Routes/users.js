const express = require('express');
const router = express.Router();

// authentication controllers
const { 
    register, 
    login
} = require('../Controllers/users/authentication')

router.post('/register', register)
router.post('/login', login)

module.exports = router