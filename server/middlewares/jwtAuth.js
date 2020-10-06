const jwt = require('jsonwebtoken');
const Driver = require('../models/driver');
const User = require('../models/user');

exports.verifyUser = (req, res) => {
    jwt.verify(res.locals.token, 'aditya', async (err, authorizedData) => {
        if (err) {
            // If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route', err);
            res.sendStatus(403);
        }
        try {
            if (authorizedData.role === 'user') {
                const user = await User.findOne({
                    _id: authorizedData.id,
                }).exec();
                console.log('SUCCESS: Set to user before route');
                res.locals.authUser = user;
                console.log(res.locals, 'user');
                authorizedData = {
                    ...authorizedData,
                    user,
                    rideInfo: res.locals.isRide,
                };
                return res.json({
                    message: 'Successful log in',
                    authorizedData,
                });
            }
            const driver = await Driver.findOne({
                _id: authorizedData.id,
            }).exec();
            console.log('SUCCESS: Set to driver before route');
            const user = driver; // for the ease of checking in res.locals and in frontend
            res.locals.authUser = user;
            authorizedData = {
                ...authorizedData,
                user,
                isRide: res.locals.isRide,
            };
            console.log(res.locals, 'user');
            return res.json({
                message: 'Successful log in',
                authorizedData,
            });
        } catch (err) {
            console.log(err);
        }
    });
};

exports.checkToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
};
