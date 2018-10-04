const express = require('express');
const router = express.Router();
const db = require('../db/index');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {
  authLoggedIn,
  correctUser,
  correctCompany
} = require('../middleware/auth.js');
const userSchema = require('../schema/users');
const validate = require('jsonschema').validate;

// POST /users - this should create a new user
router.post('', async (req, res, next) => {
  try {
    const result = validate(req.body, userSchema);
    // result should be an object and will have key of valid: boolean
    if (!result.valid) {
      const errors = result.errors.map(err => err.stack);
      return next(errors);
      // errors is an array of all the errors
    }
    // need to hash pw with bcrypt first in order to store
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.query(
      'INSERT INTO users (first_name, last_name, email, photo, company_id, password, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.company_id,
        hashedPassword,
        req.body.username
      ]
    );
    delete newUser.rows[0].password;
    return res.json(newUser.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// GET /users - this should return a list of all the user objects
router.get('', authLoggedIn, async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM users');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});
// GET /users/:id - this should return a single user found by its id
router.get('/:id', authLoggedIn, async (req, res, next) => {
  try {
    // query for a user WHERE id matches the params passed in
    const rawData = await db.query('SELECT * FROM users WHERE id=$1', [
      req.params.id
    ]);
    const user = rawData.rows[0];
    // query for jobs that has this user id using a M:M join!!!
    // select a column from
    // DO LATER
    const jobsArr = await db.query(
      `
      SELECT jobs.title FROM jobs
        JOIN jobs_users ON jobs.id=jobs_users.job_id
        JOIN users ON users.id=jobs_users.user_id
      WHERE users.id=$1
    `,
      [req.params.id]
    );
    const jobsTitle = jobsArr.rows.map(job => {
      return job.title;
    });
    user.jobs = jobsTitle;
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});
// PATCH /users/:id - this should update an existing user and return the updated user
router.patch('/:id', correctUser, async (req, res, next) => {
  try {
    const result = validate(req.body, userSchema);
    // result should be an object and will have key of valid: boolean
    if (!result.valid) {
      const errors = result.errors.map(err => err.stack);
      return next(errors);
      // errors is an array of all the errors
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await db.query(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, photo=$4, company_id=$5, password=$6, username=$7 WHERE id=$8 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.company_id,
        hashedPassword,
        req.body.username,
        req.params.id
      ]
    );
    // to hide pw
    delete data.rows[0].password;
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// DELETE /users/:id - this should remove an existing user and return the deleted user
router.delete('/:id', correctUser, async (req, res, next) => {
  try {
    const data = await db.query('DELETE FROM users WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'deleted user' });
  } catch (err) {
    return next(err);
  }
});

// Part 4:
// POST request /users/auth
router.post('/auth', async (req, res, next) => {
  try {
    const username = req.body.username;
    const pw = req.body.password;
    const foundUser = await db.query('SELECT * FROM users WHERE username=$1', [
      username
    ]);
    // check if username is in DB
    if (foundUser.rows.length === 0) {
      return res.json({
        message: 'Invalid Username'
      });
    }
    // check to see if pw is same in db stored as hash
    // use bcrypt.compare method! will return a boolean
    const result = await bcrypt.compare(pw, foundUser.rows[0].password);

    if (result === false) {
      return res.json({
        message: 'WRONG PW!!! X_X'
      });
    } else {
      // use jsonwebtoken to sign and get a token!
      // secret key is there to decode it later
      // you will get a JWT from sign
      const token = jsonwebtoken.sign(
        {
          user_id: foundUser.rows[0].id,
          comment: 'THIS IS THE PAYLOAD Change username to user_id'
        },
        'Steve'
      );
      return res.json({ token });
    }
  } catch (err) {
    return res.json({
      message: 'Unauthorized'
    });
  }
});

module.exports = router;
