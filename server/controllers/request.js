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
    console.log(pickupLocation.split(',')[0], pickupLocation.split(',')[0]);
    dropLocation = [
        parseFloat(dropLocation.split(',')[0].trim()),
        parseFloat(dropLocation.split(',')[1].trim()),
    ];
    pickupLocation = [
        parseFloat(pickupLocation.split(',')[0].trim()),
        parseFloat(pickupLocation.split(',')[1].trim()),
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
        console.log(err, 'from make req');
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
    if (dropAddress) objForUpdate.dropAddress = dropAddress;
    if (timeOfArrival) objForUpdate.timeOfArrival = timeOfArrival;
    objForUpdate.reqStatus = 'remaining';
    objForUpdate = { $set: objForUpdate, $unset: { driverId: '' } };
    const request = await Request.findOneAndUpdate(
        { _id: reqId },
        objForUpdate,
        { new: true },
    ).exec();
    res.json(request);
};

exports.acceptReq = async (req, res) => {
    const { reqId } = req.params;
    const request = await Request.findOneAndUpdate(
        { _id: reqId },
        {
            driverId: res.locals.authUser._id,
            isAccepted: true,
            reqStatus: 'accepted',
        },
        { new: true },
    );
    await request.populate('userId').populate('driverId').execPopulate();
    // console.log(request);
    res.json(request);
};

exports.allReq = async (req, res) => {
    const reqsArr = await Request.find({}).exec();
    return res.json(reqsArr);
};
