/* eslint-disable no-else-return */
//= ============Imports_START=============//
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Request = require('../models/request');
const Driver = require('../models/driver');
const jwtAuth = require('../middlewares/jwtAuth');
// const issueJWT = require('../utils/issueJWT');
// require('../config/passportConfig')(passport);
//= ============Imports_END=============//

//= ============Register a user=============//
exports.userRegister = (req, res) => {
    const { email, password, username, phoneno } = req.body;
    User.findOne({ email: email }, async (err, doc) => {
        if (err) throw err;
        if (doc) return res.send('User already exists');
        if (!doc) {
            console.log(email, password);
            const hashedPwd = await bcrypt.hash(password, 10);
            const user = new User({
                email: email,
                password: hashedPwd,
                username: username,
                phoneNo: phoneno,
            });
            await user.save();
            console.log('USER IS CREATED!!');
            return res.json({ email: email, password: password });
        }
    });
};
exports.driverRegister = (req, res) => {
    const { email, password, username, phoneno } = req.body;
    Driver.findOne({ email: email }, async (err, doc) => {
        if (err) throw err;
        if (doc) return res.send('driver already exists');
        if (!doc) {
            console.log(email, password);
            const hashedPwd = await bcrypt.hash(password, 10);
            const driver = new Driver({
                email: email,
                password: hashedPwd,
                username: username,
                phoneNo: phoneno,
            });
            await driver.save();
            console.log('driver IS CREATED!!');
            return res.json({ email: email, password: password });
        }
    });
};

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: 'could not find user',
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            const payload = { id: user._id, role: user.role };
            // console.log(payload.user, 'test');
            const token = jwt.sign(payload, 'aditya', {
                expiresIn: 86400 * 7,
            });
            const rideInfo = await Request.findOne({
                $or: [
                    { userId: user._id, reqStatus: 'accepted' },
                    { userId: user._id, reqStatus: 'remaining' },
                ],
            }).exec();
            if(rideInfo!==null){
                await rideInfo.populate('userId').populate('driverId').execPopulate();
            }
            return res.status(200).json({
                success: true,
                token: token,
                user: user,
                rideInfo: rideInfo,
                type: 'user',
            });
        }
        return res.status(401).json({
            success: false,
            msg: 'you entered the wrong password',
        });
    } catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};
exports.driverLogin = async (req, res) => {
    try {
        const driver = await Driver.findOne({ email: req.body.email }).exec();
        if (!driver) {
            return res.status(401).json({
                success: false,
                msg: 'could not find user',
            });
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            driver.password,
        );
        if (isMatch) {
            const payload = { id: driver._id, role: driver.role };
            // console.log(payload.user, 'test');
            const token = jwt.sign(payload, 'aditya', {
                expiresIn: 86400 * 7,
            });
            const rideInfo = await Request.findOne({
                driverId: driver._id,
                reqStatus: 'accepted',
            }).exec();
            if(rideInfo!==null){
                await rideInfo.populate('userId').populate('driverId').execPopulate();
            }
            return res.status(200).json({
                success: true,
                token: token,
                user: driver,
                rideInfo: rideInfo,
                type: 'driver',
            });
        }
        return res.status(401).json({
            success: false,
            msg: 'you entered the wrong password',
        });
    } catch (err) {
        console.log(err);
        return res.json({ message: err });
    }
};
exports.userLogout = (req, res) => {
    req.logOut();
    return res.json({ message: 'logged out' });
};

exports.getUser = (req, res) => {
    if (res.locals.isOauth) {
        console.log(req.user);
        const user = { user:  req.user , rideInfo: res.locals.isRide };
        return res.json(user);
    } else if (res.locals.isTokenAuth) {
        jwtAuth.verifyUser(req, res);
    }
};
