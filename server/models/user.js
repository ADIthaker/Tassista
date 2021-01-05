const mongoose = require('mongoose');

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
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    address: String,
    role: Number,
});

module.exports = mongoose.model('User', user);
