const express = require('express');
const router = express.Router();
const { createAdminUser, adminLogin } = require('../Controllers/admin');
router.post('/admin/register', createAdminUser);
router.post('/admin/login', adminLogin);

module.exports = router;