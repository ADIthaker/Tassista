const jwtAuth = require('./jwtAuth');

exports.isAuth = (req, res, next) => {
    if (!req.user && !jwtAuth.isToken(req, res)) {
        return res.redirect('http://localhost:3000/login');
    }
    return next();
};
// exports.isAlreadyLoggedIn = (req, res, next) => {
//     console.log('in isalreadyauth', req.session.passport);
//     if (
//         req.session.passport === undefined ||
//         Object.keys(req.session.passport).length === 0
//     ) {
//         return next();
//     }
//     return res.redirect('http://localhost:3000/');
// };
