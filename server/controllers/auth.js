//= ============Imports_START=============//
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
            const payload = { user };
            // console.log(payload.user, 'test');
            const token = jwt.sign(payload, 'aditya', {
                expiresIn: 86400 * 7,
            });
            return res.status(200).json({
                success: true,
                token: token,
                user: user,
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
    console.log(req.session, 'logged out');
    return res.json({ message: 'logged out' });
};

exports.getUser = (req, res) => {
    if (
        req.session.passport === undefined ||
        Object.keys(req.session.passport).length === 0
    ) {
        return res.json({ user: 'No user found' });
    }
    User.findOne({ _id: req.session.passport.user })
        .then((user) => res.json({ user: user }))
        .catch((err) => console.log(err));
};
