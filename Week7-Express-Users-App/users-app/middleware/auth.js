const jsonwebtoken = require('jsonwebtoken');

function ensureCorrectUser(req, res, next) {
  try {
    const urlId = +req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'SECRET');
    if (decodedToken.user_id === urlId) {
      return next();
    }
  } catch (err) {
    return res.json({
      message: 'WRONG'
    });
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'SECRET');
    // moves to the next middleware! or function
    return next();
  } catch (err) {
    return res.json({
      message: 'Unauth'
    });
  }
}

// object short hand for ensureCorrectUser: ensureCorrectUser
module.exports = {
  ensureCorrectUser,
  ensureLoggedIn
};
