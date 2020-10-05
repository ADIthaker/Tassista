const User = require('../models/user');
const Driver = require('../models/driver');
const Request = require('../models/request');

exports.makeRequest = async (req, res) => {
    let { stops, dropLocation, pickupLocation } = req.body;
    console.log(dropLocation, pickupLocation);
    dropLocation = [
        parseFloat(dropLocation.split(',')[0]),
        parseFloat(dropLocation.split(',')[1]),
    ];
    pickupLocation = [
        parseFloat(pickupLocation.split(',')[0]),
        parseFloat(pickupLocation.split(',')[1]),
    ];
    stops = stops || [];
    const request = new Request({
        userId: res.locals.authUser._id,
        dropLocation: {
            location: {
                type: 'Point',
                coordinates: dropLocation,
            },
        },
        stops: [],
        pickupLocation: {
            location: {
                type: 'Point',
                coordinates: pickupLocation,
            },
        },
    });
    await request.save();
    res.json(request);
};

exports.acceptReq = async (req, res) => {
    const { reqId } = req.body;
    const request = await Request.findOneAndUpdate(
        { _id: reqId },
        { driverId: res.locals.authUser._id, isAccepted: true },
        { new: true },
    );
    await request.populate('userId').populate('driverId').execPopulate();
    res.json(request);
};
