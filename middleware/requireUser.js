async function requireUser(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send(`Unauthorized. Access Denied<a href='/'>Go Back</a>`);
    }
    const user = JSON.stringify(await req.user)
    const readyUser = JSON.parse(user)
    if (readyUser._id === '64465fef3b2e6a4818797f3a') {
      return next();
    } else {
     return res.status(401).send(`Unauthorized. Access Denied<a href='/'>Go Back</a>`);
    }
  }

  module.exports = requireUser;