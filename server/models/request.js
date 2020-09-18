const mongoose = require('mongoose');
const pointSchema = require('./location');

const { Schema } = mongoose;

const request = new Schema(
    {
        riderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        driverID: { type: Schema.Types.ObjectId, ref: 'User' },
        pickupLocation: {
            type: pointSchema,
            required: true,
        },
        dropLocation: {
            type: pointSchema,
            required: true,
        },
        stops: {
            type: [pointSchema],
            required: true, // can set to empty if no stops
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        isPaid: {
            type: Boolean,
            required: true, // if no paid yet remind driver at the end of the journey
        },
        timeOfArrival: {
            type: Date,
            required: true,
        },
        luxury: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);
module.exports = mongoose.model('Request', request);
