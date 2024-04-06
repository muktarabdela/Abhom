const User = require('../Database/models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
require('dotenv').config()

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('auth header error ')
    }
    //getting the token from the header
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // Atach the user to jobs route
        req.user = { userId: payload.userID, name: payload.username, role: payload.role }
        next()
    } catch (error) {
        console.log(error);
    }
}
// const authenticateAdmin = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             console.log('No token provided');
//         }
//         const token = authHeader.split(' ')[1]

//         if (!token) {
//             return res.status(401).json({ success: false, message: 'No token provided' });
//         }
//         // Verify JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // Check if the user exists and is an admin
//         const adminUser = await User.findById(decoded.userID);
//         if (!adminUser || adminUser.role !== 'admin') {
//             return res.status(401).json({ success: false, message: 'Unauthorized access' });
//         }
//         req.adminUser = adminUser;
//         next();
//     } catch (error) {
//         res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// }
// const isAdmin = async (req, res, next) => {
//     try {
//         const email = req.email;
//         const admin = await User.findOne({ email: email });

//         if (!admin) {
//             return res.status(404).json({
//                 status: "fail",
//                 error: "admin not found",
//             });
//         }
//         if (admin.role !== 'admin') {
//             next()
//         } else {
//             return res.status(403).json({
//                 status: "fail",
//                 error: "Not an Admin",
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             status: "error",
//             error: "Internal Server Error",
//         });
//     }
// }

module.exports = auth