//= ============Imports_START=============//
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// require('../config/passportConfig')(passport);
//= ============Imports_END=============//

//= ============Register a user=============//
exports.userRegister = (req, res) => {
    const { email, password, username } = req.body;
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
            });
            await user.save();
            console.log('USER IS CREATED!!');
            return res.json({ email: email, password: password });
        }
    });
};

exports.userLogin = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        try {
            // console.log(info);
            if (err) {
                return res.json({ message: err });
            }
            if (!user) {
                res.json({ message: 'no such user' });
            } else {
                req.logIn(user, (error) => {
                    if (error) {
                        res.json({ message: error });
                    }
                    // console.log(req.session, req.user);
                    // return res.json({ message: 'gottem' });
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, 'top_secret');
                    return res.json({ token });
                });
            }
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

exports.userLogout = (req, res) => {
    req.logOut();
    return res.json({ message: 'logged out' });
};
exports.getUser = (req, res) => {
    return res.json({ user: req.user });
};
