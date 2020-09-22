exports.isAuth = (req, res, next) => {
    if (
        req.session.passport === undefined ||
        Object.keys(req.session.passport).length === 0
    ) {
        return res.redirect('http://localhost:3000/register');
    }
    return next();
};
exports.isAlreadyLoggedIn = (req, res, next) => {
    console.log('in isalreadyauth', req.session.passport);
    if (
        req.session.passport === undefined ||
        Object.keys(req.session.passport).length === 0
    ) {
        return next();
    }
    return res.redirect('http://localhost:3000/');
};
