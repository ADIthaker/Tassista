const User = require('../models/user');
const Driver = require('../models/driver');

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
    try {
        const query = await User.update({ _id: user._id }, objForUpdate).exec();
        res.json(query);
    } catch (err) {
        console.log(err);
    }
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
    try {
        const query = await Driver.update(
            { _id: user._id },
            objForUpdate,
        ).exec();
        res.json(query);
    } catch (err) {
        console.log(err);
    }
};
