const express = require('express');
const router = express.Router();
const db = require('../db'); // will look for index.js in the db directory
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
// taking from the export object the two functions we need from the auth.js file
// object destructing
const { ensureCorrectUser, ensureLoggedIn } = require('../middleware/auth.js');

router.get('', async (req, res, next) => {
  try {
    const userData = await db.query('SELECT * FROM users');
    return res.json(userData.rows);
  } catch (err) {
    return next(err);
  }
});
// POST /
router.post('', async (req, res, next) => {
  // take req.body.username and req.body.password and add it to the db
  try {
    // just an example DO NOT STORE pw in plain text
    // one way encryption
    // using bcrypt to has my pw
    // hash will salt for you
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [req.body.username, hashedPassword]
    );
    delete newUser.rows[0].password;
    return res.json(newUser.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// respond with the newly created user!!
// what happens if you try and add a user with a username that already exists?

// POST /users/auth
// http POST localhost:3000/users/auth username=elie password=secret
//   1 - check and see if the username exists in the database
// 2 - if not
//     return res.json({message: "Invalid Username"})
// 3 - if so
//     check to see if the password specified is the same as the one in the DB
// 4 - if not
//     return res.json({message: "Invalid Password"})
// 5 - if so
//     return res.json({message: "You made it!"})
router.post('/auth', async (req, res, next) => {
  // pass in body a username and password
  const username = req.body.username;
  const password = req.body.password;
  // check if username exists in data base
  const foundUser = await db.query('SELECT * FROM users WHERE username=$1', [
    username
  ]);
  if (foundUser.rows.length === 0) {
    return res.json({ message: 'Invalid Username' });
  }
  // check to see if pw specific is same as the one in the DB
  const result = await bcrypt.compare(password, foundUser.rows[0].password);
  if (result === false) {
    return res.json({ message: 'Invalid PW' });
  } else {
    // paylod is inside of sign
    const token = jsonwebtoken.sign(
      {
        user_id: foundUser.rows[0].id,
        hello: 'Woohoo!'
      },
      'SECRET'
    );
    // token: token
    return res.json({ token });
  }
});
// 1 - sending JWT to server
// ways to send data to server
// HTTP headers
// --> 'Authorization': 'TOKEN'

// OTHER ways but we will not use in this case
// body of the request - req.body
// url parameters - users/elie
// query string!
//  whichever one you want

// sending a JWT to the server!
// once I get it there... I need to make sure it's a valid JWT
// and if it is ... I'll show you the message!
router.get('/secret', ensureLoggedIn, (req, res, next) => {
  try {
    // grab token got from headers!, specifically the authorization header
    //const token = req.headers.authorization;
    // took token and use JWT to verify with the secret token
    //const decodedToken = jsonwebtoken.verify(token, 'SECRET');
    // show me the headers???
    //console.log(req.headers);
    return res.json({
      message: 'you made it! yay middleware'
    });
  } catch (err) {
    return res.json({
      message: 'Unauthorized'
    });
  }
});

// Make another route for "/protected"
// if you do not send a valid JWT in the auth header - respond with {message: 'Unauth'}
// otherwise {message: 'You made it'}
router.get('/protected', (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'SECRET'); // throws error if this is NOT verified
    return res.json({
      decodedToken
    });
  } catch (err) {
    return res.json({
      message: 'Unauth'
    });
  }
});

// another route for '/secure/:id"
// if you do not send valid JWT auth respond unauth
// if valid make sure ID in URL is same as the id in the token

router.get('/secure/:id', (req, res, next) => {
  try {
    // params will come in as a STRING
    const urlId = +req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'SECRET');
    console.log(decodedToken);
    if (decodedToken.user_id === urlId) {
      return res.json({
        message: 'FINALLY HOLY SHIT'
      });
    }
  } catch (err) {
    return res.json({
      message: 'Unauth'
    });
  }
});

// Make another route to '/supersecure/:id'
// do same
// refactor to a seperate middleware function!

router.get('/supersecure/:id', ensureCorrectUser, (req, res, next) => {
  try {
    return res.json({
      message: 'YASSSSSS'
    });
  } catch (err) {
    return res.json({
      message: 'Stop in the name of loveeeee'
    });
  }
});

module.exports = router;
