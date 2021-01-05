const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/user');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                // console.log(username, password);
                User.findOne({ email: email }, async (err, user) => {
                    // console.log(user, err);
                    if (err) {
                        return done(err, false);
                    }
                    if (!user) {
                        return done(null, false);
                        // eslint-disable-next-line no-else-return
                    }
                    bcrypt.compare(password, user.password, (error, result) => {
                        console.log(result, 'result');
                        if (error) {
                            throw error;
                        }
                        if (!result) {
                            return done(null, false, {
                                success: false,
                                msg: 'you entered the wrong password',
                            });
                        }
                        if (result) {
                            return done(null, user);
                        }

                        // response is OutgoingMessage object that server response http request
                    });

                    // return done(null, false);
                });
            },
        ),
    );
    // OAuth Google strat

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        });
    });
};
// Local Strat
