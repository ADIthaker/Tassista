const jwt = require('jsonwebtoken');

exports.isTokenAuth = (req, res, next) => {
    const header = req.headers.authorization;
    // console.log(header);
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        // console.log(token);
        res.locals.token = token;
        res.locals.isTokenAuth = true;
    } else {
        res.locals.isTokenAuth = false;
    }
    next();
};
exports.isOAuth = (req, res, next) => {
    if (req.user) {
        res.locals.isOauth = true;
    } else {
        res.locals.isOauth = false;
    }
    if (res.locals.isOauth === false && res.locals.isTokenAuth === false) {
        return res.json({
            success: false,
            message: 'User is not authorized',
        });
    }
    next();
};

const verifyUser = (req, res, next) => {
    jwt.verify(res.locals.token, 'aditya', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route', err);
            return null;
        }
        res.locals.authUser = { _id: authorizedData.id };
    });
};

exports.setUser = (req, res, next) => {
    if (res.locals.isOauth) {
        console.log(req.user);
        res.locals.authUser = req.user;
    } else if (res.locals.isTokenAuth) {
        verifyUser(req, res);
    }
    next();
};
