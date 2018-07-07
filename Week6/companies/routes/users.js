const express = require('express');
const router = express.Router();
const db = require('../db/index');

// POST /users - this should create a new user
router.post('', async (req, res, next) => {
  try {
    const data = await db.query(
      'INSERT INTO users (first_name, last_name, email, photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.body.first_name, req.body.last_name, req.body.email, req.body.photo]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// GET /users - this should return a list of all the user objects
router.get('', async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM users');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});
// GET /users/:id - this should return a single user found by its id
router.get('/:id', async (req, res, next) => {
  try {
    // query for a user WHERE id matches the params passed in
    const data = await db.query('SELECT * FROM users WHERE id=$1', [
      req.params.id
    ]);
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// PATCH /users/:id - this should update an existing user and return the updated user
router.patch('/:id', async (req, res, next) => {
  try {
    const data = await db.query(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, photo=$4 WHERE id=$5 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.params.id
      ]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// DELETE /users/:id - this should remove an existing user and return the deleted user
router.delete('/:id', async (req, res, next) => {
  try {
    const data = await db.query('DELETE FROM users WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'deleted user' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
