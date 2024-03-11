require('dotenv').config();

const config = {
    mongoURI: process.env.MONGOURI,
};
module.exports = config