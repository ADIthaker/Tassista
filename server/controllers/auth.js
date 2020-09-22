//= ============Imports_START=============//
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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

exports.userLogin = async (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
        try {
            console.log(user);
            if (err || !user) {
                // const errormsg = new Error('An Error occurred');
                return res.json({ message: err });
            }
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
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
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
