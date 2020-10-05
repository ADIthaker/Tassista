const mongoose = require('mongoose');

const pointSchema = require('./location');

const { Schema } = mongoose;

const user = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: String,
    password: String,
    googleId: String,
    phoneNo: Number,
    picture: String,
    homeLocation: {
        type: pointSchema,
        index: '2dsphere',
    },
    workLocation: {
        type: pointSchema,
        index: '2dsphere',
    },
    fixedLocations: {
        type: [pointSchema],
    },
    address: String,
    role: {
        type: String,
        default: 'user',
    },
});

module.exports = mongoose.model('User', user);
