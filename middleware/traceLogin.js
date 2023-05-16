async function traceLogin(req, res, next) {
    if (!req.isAuthenticated()) {
        req.pleaseLogin = true;
        return next();
    } else {
        req.pleaseLogin = false;
        return next();
    }
}

module.exports = traceLogin;