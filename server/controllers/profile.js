const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Driver = require('../models/driver');
const user = require('../models/user');

const verifyUser = (req, res, next) => {
    jwt.verify(res.locals.token, 'aditya', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route', err);
            return null;
        }
        res.locals.authUser = { _id: authorizedData.id };
        return;
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
    const {
        email,
        username,
        phoneNo,
        homeLocation,
        workLocation,
        address,
    } = req.body;
    const user = res.locals.authUser;
    console.log(res.locals);
    console.log(user);
    const query = await User.findOneAndUpdate(
        { _id: user._id },
        {
            email: email,
            username: username,
            phoneNo: phoneNo,
            homeLocation: homeLocation,
            workLocation: workLocation,
            address: address,
        },
    ).exec();
    res.json(query);
};
