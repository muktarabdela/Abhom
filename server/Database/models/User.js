const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide a full name'],
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        unique: true,
        validate: {
            validator: function (v) {
                // Check if the phone number consists of exactly 10 digits
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number. It should be exactly 10 digits.`,
        },
    },
    profile: {
        preferences: {
            location: String,
            priceRange: {
                from: Number,
                upto: Number,
            },
            size: Number,
            amenities: [String],
        },
        searchHistory: [{
            searchedString: String,
            timeOfSearch: Date,
            searchID: ObjectId
        }],
    },
    deviceToken: {
        type: String,
        default: "fcbFL6qAQSCvszi5rfJKW9:APA91bHXmBrt_C3VAS0jo9NgsgSL2yFR5nzfU33KgF-fDf-KRFGFaGcfwfTEzC3V45HHzW4iunepUnaM-nEvLD7Xhevf4PGNCKjK-GtvTwRMyfNZ36ryHDXXq2QQkgFNiDrPLyv08Nqe"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.pre('save', async function () {
    // if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
    return jwt.sign({ userID: this._id, username: this.username, role: 'user' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);
