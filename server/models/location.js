const mongoose = require('mongoose');

const { Schema } = mongoose;

const pointSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
});
module.exports = pointSchema;
