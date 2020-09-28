const jwtAuth = require('./jwtAuth');

exports.isAuth = (req, res, next) => {
    console.log('\n\n\n', req.user, '\n\n\n');
    // console.log(jwtAuth.isToken(req, res));
    // console.log(!req.user && !jwtAuth.isToken(req, res))
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
