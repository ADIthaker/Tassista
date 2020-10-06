const Request = require('../models/request');

exports.isRiding = async (req, res, next) => {
    const { authUser } = res.locals;
    if (authUser.role === 'user') {
        try {
            const request = await Request.findOne({
                userId: authUser._id,
            }).exec();
            if (request !== null) {
                await request
                    .populate('userId')
                    .populate('driverId')
                    .execPopulate();
                res.locals.isRide = request;
            } else{
                res.locals.isRide = null;
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            const request = await Request.findOne({
                driverId: authUser._id,
                reqStatus: 'accepted',
            }).exec();
            if (request !== null) {
                await request
                    .populate('userId')
                    .populate('driverId')
                    .execPopulate();
                res.locals.isRide = request;
            } else{
                res.locals.isRide = null;
            }
        } catch (err) {
            console.log(err);
        }
    }
    next();
};
