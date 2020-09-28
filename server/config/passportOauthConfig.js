const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');
const Driver = require('../models/driver');

module.exports = (passport) => {
    passport.use(
        'user',
        new GoogleStrategy(
            {
                callbackURL: 'http://localhost:4000/google/user/redirect',
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
            },
            (accessToken, refreshToken, profile, done) => {
                console.log('Profile', profile);
                // console.log(accessToken);
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
    passport.use(
        'driver',
        new GoogleStrategy(
            {
                callbackURL: 'http://localhost:4000/google/driver/redirect',
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
            },
            (accessToken, refreshToken, profile, done) => {
                console.log('Profile', profile);
                // console.log(accessToken);
                Driver.findOne(
                    { googleId: profile.id },
                    async (err, driver) => {
                        if (err) {
                            done(err, false);
                        }
                        if (!driver) {
                            const newDriver = new Driver({
                                googleId: profile.id,
                                email: profile.emails[0].value,
                                username: profile.displayName,
                            });
                            await newDriver.save();
                            done(null, newDriver);
                        }
                        return done(null, driver);
                    },
                );
            },
        ),
    );
    passport.serializeUser((user, cb) => {
        // console.log(user, "from serialize");
        cb(null, { id: user.id, role: user.role });
    });
    passport.deserializeUser((obj, cb) => {
        if (obj.role === 'user') {
            User.findOne({ _id: obj.id }, (err, user) => {
                cb(err, user);
            });
        }
        Driver.findOne({ _id: obj.id }, (err, driver) => {
            cb(err, driver);
        });
    });
};
// deserialize plays some role in logout
