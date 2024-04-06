const express = require('express');
const router = express.Router();

// authentication controllers
const {
    register,
    login
} = require('../Controllers/users/authentication');
const { getAllUsers, specificUser } = require('../Controllers/users/allUsers');

router.post('/register', register)
router.post('/login', login)
router.get('/users', getAllUsers)
router.get('/users/:id', specificUser)

module.exports = router