const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/user');

// Local Strat
passport.use(
    new LocalStrategy((username, password, done) => {
        // console.log(username,password);
        User.findOne({ email: username }, async (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return done(null, false);
            }
            await bcrypt.compare(password, user.password, (error, result) => {
                if (error) {
                    throw error;
                }
                if (result === true) {
                    return done(null, user);
                }
                return done(null, false);
            });
        });
    }),
);
// OAuth Google strat
passport.use(
    new GoogleStrategy(
        {
            callbackURL: 'http://localhost:4000/google/redirect',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Profile', profile);
            User.findOne({ googleId: profile.id }, async (err, user) => {
                if (err) {
                    done(err, false);
                }
                if (!user) {
                    const newUser = new User({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,
                    });
                    await newUser.save();
                    done(null, newUser);
                }
                return done(null, user);
            });
        },
    ),
);
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
        cb(err, user);
    });
});
