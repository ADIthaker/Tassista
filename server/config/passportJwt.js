const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (passport) => {
    passport.use(
        new JWTstrategy(
            {
                secretOrKey: 'top_secret',

                jwtFromRequest: ExtractJWT.fromUrlQueryParameter(
                    'secret_token',
                ),
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
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
