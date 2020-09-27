const jwt = require('jsonwebtoken');

exports.verifyUser = (req, res) => {
    jwt.verify(req.token, 'aditya', (err, authorizedData) => {
        if (err) {
            // If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route', err);
            res.sendStatus(403);
        } else {
            // If token is successfully verified, we can send the autorized data
            res.json({
                message: 'Successful log in',
                authorizedData,
            });
            console.log('SUCCESS: Connected to protected route');
        }
    });
};

exports.checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        // If header is undefined return Forbidden (403)
        res.sendStatus(403);
    }
};
