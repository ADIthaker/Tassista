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
