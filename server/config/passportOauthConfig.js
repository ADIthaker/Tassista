const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

module.exports = (passport) => {
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
};
