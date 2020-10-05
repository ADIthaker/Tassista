const mongoose = require('mongoose');
const pointSchema = require('./location');

const { Schema } = mongoose;

const request = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
        pickupLocation: {
            type: pointSchema,
            index: '2dsphere',
            required: true,
        },
        dropLocation: {
            type: pointSchema,
            index: '2dsphere',
            required: true,
        },
        stops: {
            type: [pointSchema],
            index: '2dsphere',
            required: true, // can set to empty if no stops
        },
        pickupAddress: String,
        dropAddress: String,
        paymentMethod: {
            type: String,
            required: true,
            default: 'cash',
        },
        isPaid: {
            type: Boolean,
            default: false,
            required: true, // if no paid yet remind driver at the end of the journey
        },
        timeOfArrival: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        luxury: {
            type: String,
            required: true,
            default: 'basic',
        },
        isCompleted: {
            type: Boolean,
            default: false,
            required: true,
        },
        isAccepted: {
            type: Boolean,
            default: false,
            required: true,
        },
        reqStatus: {
            type: String,
            default: 'remaining',
        },
    },
    { timestamps: true },
);
module.exports = mongoose.model('Request', request);
