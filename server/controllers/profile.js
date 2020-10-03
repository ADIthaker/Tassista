const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Driver = require('../models/driver');

const verifyUser = (req, res, next) => {
    jwt.verify(res.locals.token, 'aditya', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route', err);
            return null;
        }
        res.locals.authUser = { _id: authorizedData.id };
    });
};
exports.setUser = (req, res, next) => {
    if (res.locals.isOauth) {
        console.log(req.user);
        res.locals.authUser = req.user;
    } else if (res.locals.isTokenAuth) {
        verifyUser(req, res);
    }
    next();
};
exports.changeUserProfile = async (req, res) => {
    const { username, phoneNo, homeLocation, workLocation, address } = req.body;
    let objForUpdate = {};
    if (username) objForUpdate.username = username;
    if (phoneNo) objForUpdate.phoneNo = phoneNo;
    if (homeLocation) objForUpdate.homeLocation = homeLocation;
    if (workLocation) objForUpdate.workLocation = workLocation;
    if (address) objForUpdate.address = address;
    if (req.file) objForUpdate.picture = req.file.path;
    objForUpdate = { $set: objForUpdate };
    const user = res.locals.authUser;
    const query = await User.update({ _id: user._id }, objForUpdate).exec();
    res.json(query);
};

exports.changeDriverProfile = async (req, res) => {
    const { username, phoneNo, type, address } = req.body;
    let objForUpdate = {};
    const user = res.locals.authUser;
    if (username) objForUpdate.username = username;
    if (phoneNo) objForUpdate.phoneNo = phoneNo;
    if (type) objForUpdate.type = type;
    if (address) objForUpdate.address = address;
    if (req.file) objForUpdate.picture = req.file.path;
    objForUpdate = { $set: objForUpdate };
    const query = await Driver.update({ _id: user._id }, objForUpdate).exec();
    res.json(query);
};
