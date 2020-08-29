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
});

module.exports = mongoose.model('User', user);
