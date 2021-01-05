const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (passport) => {
    passport.use(
        new JWTstrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
                secretOrKey: 'aditya',
                algorithms: ['RS256'],
            },
            function (jwtPayload, done) {
                console.log('HI');
                User.findOne({ email: jwtPayload.user.email }, function (
                    err,
                    user,
                ) {
                    if (err) {
                        console.log(err);
                        return done(err, false);
                    }
                    if (user) {
                        console.log(user);
                        return done(null, user);
                    }
                    console.log('here');
                    return done(null, false);
                });
            },
        ),
    );
};
