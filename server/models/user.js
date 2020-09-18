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
    location: {
        type: pointSchema,
    },
    address: String,
    role: Number,
});

module.exports = mongoose.model('User', user);
