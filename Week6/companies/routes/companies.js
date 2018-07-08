const express = require('express');
const router = express.Router();
const db = require('../db/index');

// POST /companies - this should create a new company
router.post('', async (req, res, next) => {
  try {
    const data = await db.query(
      'INSERT INTO companies (name, logo) VALUES ($1, $2) RETURNING *',
      [req.body.name, req.body.logo]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// GET /companies - this should return a list of all the company objects
router.get('', async (req, res, next) => {
  try {
    // need to also query for users at that company!
    const data = await db.query('SELECT * FROM companies');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});
// GET /companies/:id - this should return a single company found by its id
// part 3 company should now be able to list jobs as well
router.get('/:id', async (req, res, next) => {
  try {
    // need to query for users as well that has company id
    const data = await db.query('SELECT * FROM companies WHERE id=$1', [
      req.params.id
    ]);
    const company = data.rows[0];
    // users
    const usersData = await db.query(
      'SELECT * FROM users WHERE current_company_id=$1',
      [req.params.id]
    );
    const jobsData = await db.query('SELECT * FROM jobs WHERE company_id=$1', [
      req.params.id
    ]);
    const usersFullInfo = usersData.rows;
    const jobsFullInfo = jobsData.rows;
    // bonus to get js to show only names of users of company
    // right now it is an array of objs [{fname: wwef, }, {fname:oijoi}, {}]
    // map?
    const usersNames = usersFullInfo.map(user => {
      return `${user.first_name} ${user.last_name}`;
    });
    const jobsTitle = jobsFullInfo.map(job => {
      return `${job.title}`;
    });
    company.users = usersNames;
    company.jobs = jobsTitle;
    return res.json(company);
  } catch (err) {
    return next(err);
  }
});
// PATCH /companies/:id - this should update an existing company and return the updated company
router.patch('/:id', async (req, res, next) => {
  try {
    const data = await db.query(
      'UPDATE companies SET name=$1, logo=$2 WHERE id=$3 RETURNING *',
      [req.body.name, req.body.logo, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// DELETE /companies/:id - this should remove an existing company and return the deleted company
router.delete('/:id', async (req, res, next) => {
  try {
    const data = await db.query('DELETE FROM companies WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'deleted company' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
