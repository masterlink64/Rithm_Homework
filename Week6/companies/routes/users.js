const express = require('express');
const router = express.Router();
const db = require('../db/index');

// POST /users - this should create a new user
router.post('', async (req, res, next) => {
  try {
    const data = await db.query(
      'INSERT INTO users (first_name, last_name, email, photo, current_company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.current_company_id
      ]
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
    const rawData = await db.query('SELECT * FROM users WHERE id=$1', [
      req.params.id
    ]);
    const user = rawData.rows[0];
    // query for jobs that has this user id using a M:M join!!!
    // select a column from
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
router.patch('/:id', async (req, res, next) => {
  try {
    const data = await db.query(
      'UPDATE users SET first_name=$1, last_name=$2, email=$3, photo=$4, current_company_id=$5 WHERE id=$6 RETURNING *',
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.photo,
        req.body.current_company_id,
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
