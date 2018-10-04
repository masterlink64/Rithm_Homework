const express = require('express');
const router = express.Router();
const db = require('../db/index');
const jsonwebtoken = require('jsonwebtoken');
const {
  authLoggedIn,
  correctUser,
  correctCompany
} = require('../middleware/auth.js');
const { validate } = require('jsonschema');
const jobsSchema = require('../schema/jobs');

router.post('', async (req, res, next) => {
  try {
    const validated = validate(req.body, jobsSchema);
    if (!validated.valid) {
      const errors = validated.errors.map(err => err.stack);
      return next(errors);
    }
    // grab token and add token into
    const token = req.headers.authorization;
    const decodedToken = jsonwebtoken.verify(token, 'Steve');
    if (!decodedToken || !decodedToken.handle_id) {
      return next({ message: 'ERROR WILL ROBINSON' });
    }

    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_id) 
    VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.body.title, req.body.salary, req.body.equity, decodedToken.handle_id]
    );
    const newJob = result.rows[0];
    return res.json(newJob);
  } catch (err) {
    return next(err);
  }
});

// list all the jobs
router.get('', authLoggedIn, async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM jobs');
    const jobsArr = result.rows;
    return res.json(jobsArr);
  } catch (err) {
    return next(err);
  }
});

// show information about a specific job by job id
router.get('/:id', authLoggedIn, async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM jobs WHERE id=$1', [
      req.params.id
    ]);
    const job = result.rows[0];
    return res.json(job);
  } catch (err) {
    return next(err);
  }
});

// update job info
router.patch('/:id', async (req, res, next) => {
  try {
    // validate the form/fields passed into body
    const validated = validate(req.body, jobsSchema);
    // validated should be a huge object, valid key should have a boolean val
    if (!validated.valid) {
      const errorArr = validated.errors.map(err => {
        return err.stack;
      });
      return next(errorArr);
    }
    const token = req.headers.authorization;
    // get company id and match jobs- company id
    const foundJob = await db.query('SELECT * FROM jobs WHERE id=$1', [
      req.params.id
    ]);
    const job_company_id = foundJob.rows[0].company_id;
    const decodedToken = jsonwebtoken.verify(token, 'Steve');
    if (decodedToken.handle_id !== job_company_id) {
      return next({ message: 'ERROR WILL ROBINSON' });
    }

    const result = await db.query(
      'UPDATE jobs SET title=$1, salary=$2, equity=$3, company_id=$4 WHERE id=$5 RETURNING *',
      [
        req.body.title,
        req.body.salary,
        req.body.equity,
        req.body.company_id,
        req.params.id
      ]
    );
    const job = result.rows[0];
    return res.json(job);
  } catch (err) {
    return next;
  }
});

// deleting a single job
router.delete('/:id', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // get company id and match jobs- company idgit
    const foundJob = await db.query('SELECT * FROM jobs WHERE id=$1', [
      req.params.id
    ]);
    const job_company_id = foundJob.rows[0].company_id;
    const decodedToken = jsonwebtoken.verify(token, 'Steve');
    if (decodedToken.handle_id !== job_company_id) {
      return next({ message: 'ERROR WILL ROBINSON' });
    }
    const result = await db.query('DELETE FROM jobs WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'deleted a job' });
  } catch (err) {
    return next(err);
  }
});

// get /jobs/id, show a jobs with all the users with that job
router.get('/:id', async (req, res, next) => {
  try {
    const jobData = await db.query('SELECT * FROM jobs WHERE id=$1', [
      req.params.id
    ]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
