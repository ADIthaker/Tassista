const User = require('../models/user');
const Driver = require('../models/driver');
const Request = require('../models/request');

exports.makeRequest = async (req, res) => {
    let {
        stops,
        dropLocation,
        pickupLocation,
        pickupAddress,
        dropAddress,
        timeOfArrival,
    } = req.body;
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
        timeOfArrival: timeOfArrival,
        stops: [],
        pickupAddress: pickupAddress,
        dropAddress: dropAddress,
        pickupLocation: {
            location: {
                type: 'Point',
                coordinates: pickupLocation,
            },
        },
    });
    try {
        await request.save();
        res.json(request);
    } catch (err) {
        console.log(err);
    }
};
exports.editRequest = async (req, res) => {
    let {
        reqId,
        stops,
        dropLocation,
        pickupLocation,
        pickupAddress,
        dropAddress,
        timeOfArrival,
        paymentMethod,
    } = req.body;
    let objForUpdate = {};
    if (stops) objForUpdate.stops = stops;
    if (dropLocation) {
        dropLocation = [
            parseFloat(dropLocation.split(',')[0]),
            parseFloat(dropLocation.split(',')[1]),
        ];
        objForUpdate.dropLocation = {
            location: {
                type: 'Point',
                coordinates: dropLocation,
            },
        };
    }
    if (pickupLocation) {
        pickupLocation = [
            parseFloat(pickupLocation.split(',')[0]),
            parseFloat(pickupLocation.split(',')[1]),
        ];
        objForUpdate.pickupLocation = {
            location: {
                type: 'Point',
                coordinates: pickupLocation,
            },
        };
    }
    if (paymentMethod) objForUpdate.paymentMethod = paymentMethod;
    if (pickupAddress) objForUpdate.pickupAddress = pickupAddress;
    if (dropAddress) objForUpdate.stops = dropAddress;
    if (timeOfArrival) objForUpdate.timeOfArrival = timeOfArrival;
    objForUpdate = { $set: objForUpdate };
    const request = await Request.findOneAndUpdate(
        { _id: reqId },
        objForUpdate,
        { new: true },
    ).exec();
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

exports.allReq = async (req, res) => {
    const reqsArr = await Request.find({}).exec();
    return res.json(reqsArr);
};
