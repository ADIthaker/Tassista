const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/user');
const Driver = require('../models/driver');
const storage = require('../utils/fileUpload');

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
    const user = res.locals.authUser;
    console.log(req.file.path, '\nYour img path\n');
    const imgUrl = req.file.path;
    const query = await User.findOneAndUpdate(
        { _id: user._id },
        {
            username: username,
            phoneNo: phoneNo,
            homeLocation: homeLocation,
            workLocation: workLocation,
            address: address,
            picture: imgUrl,
        },
    ).exec();
    res.json(query);
};

exports.changeDriverProfile = async (req, res) => {
    const { username, phoneNo, type, address } = req.body;
    const user = res.locals.authUser;
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        }
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file);
    });
    const query = await Driver.findOneAndUpdate(
        { _id: user._id },
        {
            username: username,
            phoneNo: phoneNo,
            type: type,
            address: address,
        },
    ).exec();
    res.json(query);
};
