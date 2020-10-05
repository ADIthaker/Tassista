const mongoose = require('mongoose');

const pointSchema = require('./location');

const { Schema } = mongoose;

const driver = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: String,
    password: String,
    googleId: String,
    phoneNo: Number,
    picture: String,
    addressCoords: {
        type: pointSchema,
        index: '2dsphere',
    },
    type: {
        type: String,
        default: 'basic',
    },
    rating: {
        type: Number,
        default: 0,
    },
    total_rating: {
        type: Number,
        default: 0,
    },
    address: String,
    role: {
        type: String,
        default: 'driver',
    },
});

module.exports = mongoose.model('Driver', driver);
