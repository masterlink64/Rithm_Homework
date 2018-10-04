const jsonwebtoken = require('jsonwebtoken');

// check if user is logged in
function authLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization;
    const verfiyToken = jsonwebtoken.verify(token, 'Steve');
    return next();
  } catch (err) {
    return res.json({
      message: 'Unauthorized'
    });
  }
}

// maybe later
// function companyAuthLoggedIn(req, res, next) {
//   try {
//     const token = req.headers.authorization;
//     const decodedToken = jsonwebtoken.verify(token, 'Steve');
//     if (decodedToken.handle_id) {
//       return next();
//     } else {
//       return res.json({
//         message: 'no handle_id!'
//       });
//     }
//   } catch (err) {
//     return res.json({
//       message: 'EH!'
//     });
//   }
// }

function correctUser(req, res, next) {
  try {
    const urlId = +req.params.id;
    const token = req.headers.authorization;
    //console.log(token);
    //console.log(urlId);
    const decodedToken = jsonwebtoken.verify(token, 'Steve');
    //console.log(decodedToken);
    // change later back to user_id
    if (decodedToken.user_id === urlId) {
      return next();
    }
  } catch (err) {
    return res.json({
      message: 'WRONG'
    });
  }
}

function correctCompany(req, res, next) {
  try {
    // check for token
    // use JWT to verify token
    // need to check company ID to make sure it's the right company with the right token
    const urlId = +req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'Steve');
    const companyId = decodedToken.handle_id;
    // check IDs
    if (companyId === urlId) {
      return next();
    } else {
      return res.json({
        message: 'Not Authorized, IDs DONT MATCH'
      });
    }
    // next to continue to next middleware if it is verified
  } catch (err) {
    return res.json({
      message: 'Not logged in'
    });
  }
}

module.exports = {
  authLoggedIn,
  correctUser,
  correctCompany
};
