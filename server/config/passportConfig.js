const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/user');

module.exports =(passport)=>{
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            (email, password, done) => {
                // console.log(username, password);
                User.findOne({ email: email }, async (err, user) => {
                    if (err) {
                        throw err;
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    await bcrypt.compare(
                        password,
                        user.password,
                        (error, result) => {
                            if (error) {
                                throw error;
                            }
                            if (result === true) {
                                return done(null, user);
                            }
                            return done(null, false);
                        },
                    );
            });
        }),
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
    
}
// Local Strat
