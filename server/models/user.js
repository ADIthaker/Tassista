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
    fixedLocations: {
        type: [pointSchema],
    },
    address: String,
});

module.exports = mongoose.model('User', user);
