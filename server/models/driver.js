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
    addressCoords: {
        type: pointSchema,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'basic',
    },
    rating: {
        type: Number,
        default: NaN,
    },
    total_rating: {
        type: Number,
        default: 0,
    },
    address: String,
});

module.exports = mongoose.model('Driver', driver);
