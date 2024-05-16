const jwt = require('jsonwebtoken');
const admin = require('../Database/models/admin');

const createAdminUser = async (req, res, next) => {
    try {
        const { username, password, email, phone } = req.body;
        // Create admin user with 'admin' role
        const adminUser = await admin.create({
            username,
            password,
            email,
            phone,
        });
        res.status(201).json({ success: true, adminUser });
        // Generate JWT token
        const token = adminUser.createJWT();
        res.status(200).json({ success: true, admin: adminUser, token: token });
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const adminLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Find the admin user by username
        const adminUser = await admin.findOne({ username });
        // If user is not found or password doesn't match, return an error
        if (!adminUser || !(await adminUser.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        // Generate JWT token
        const token = adminUser.createJWT();
        res.status(200).json({ success: true, admin: adminUser, token: token });
    } catch (error) {
        // console.log(error)

    }
}
module.exports = { createAdminUser, adminLogin };
