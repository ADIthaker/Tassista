exports.isAuth = (req, res, next) => {
    if (req.session.passport === undefined) {
        return res.redirect('http://localhost:3000/register');
    }
    return next();
};
exports.isAlreadyLoggedIn = (req, res, next) => {
    if (req.session.passport === undefined) {
        return next();
    }
    return res.redirect('http://localhost:3000');
};
