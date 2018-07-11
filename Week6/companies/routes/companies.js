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
const companySchema = require('../schema/companies');
const { validate } = require('jsonschema');

// POST /companies - this should create a new company
// need to add handle and password for company
// need to hash pw
router.post('', async (req, res, next) => {
  try {
    const result = validate(req.body, companySchema);
    if (!result.valid) {
      const errors = result.errors.map(err => err.stack);
      return next(errors);
      // errors is an array of all the errors
    }
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    const data = await db.query(
      'INSERT INTO companies (name, logo, handle, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.body.name, req.body.logo, req.body.handle, hashedPw]
    );
    delete data.rows[0].password;
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// GET /companies - this should return a list of all the company objects
router.get('', authLoggedIn, async (req, res, next) => {
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
router.get('/:id', authLoggedIn, async (req, res, next) => {
  try {
    // need to query for users as well that has company id
    const data = await db.query('SELECT * FROM companies WHERE id=$1', [
      req.params.id
    ]);
    const company = data.rows[0];
    // users
    const usersData = await db.query(
      'SELECT * FROM users WHERE company_id=$1',
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
router.patch('/:id', correctCompany, async (req, res, next) => {
  try {
    // can dynamically add query later on
    const result = validate(req.body, companySchema);
    if (!result.valid) {
      const errors = result.errors.map(err => err.stack);
      return next(errors);
      // errors is an array of all the errors
    }
    const data = await db.query(
      'UPDATE companies SET name=$1, logo=$2, handle=$3 WHERE id=$4 RETURNING *',
      [req.body.name, req.body.logo, req.body.handle, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// DELETE /companies/:id - this should remove an existing company and return the deleted company
router.delete('/:id', correctCompany, async (req, res, next) => {
  try {
    const data = await db.query('DELETE FROM companies WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'deleted company' });
  } catch (err) {
    return next(err);
  }
});

// part 5 companies
// authorization route that accepts handle and password in the body
// returns a JWT if handle is found and pw is correct
router.post('/auth', async (req, res, next) => {
  try {
    // trying to authincate
    const handle = req.body.handle;
    const pw = req.body.password;
    // given the handle and pw from the body in a form CHECK PW against pw in the db
    const foundCompany = await db.query(
      'SELECT * FROM companies WHERE handle=$1',
      [handle]
    );
    console.log(foundCompany);
    if (foundCompany.rows.length === 0) {
      return res.json({
        message: 'company not found'
      });
    }
    // if found now check pw
    // bcrypt compare of passed in pw and the stored hashed pw, bcrypt will do this comparison for us
    const result = await bcrypt.compare(pw, foundCompany.rows[0].password);
    if (result === false) {
      return res.json({
        message: 'WRONG PW FOR COMPANY!!! X_X'
      });
    } else {
      // use jsonwebtoken to sign and get a token!
      // secret key is there to decode it later
      // you will get a JWT from sign
      const token = jsonwebtoken.sign(
        {
          handle_id: foundCompany.rows[0].id,
          comment: 'THIS IS THE PAYLOAD'
        },
        'Steve'
      );
      return res.json({ token });
    }
  } catch (err) {
    return res.json({
      message: 'Unauthorized for this route!'
    });
  }
});

module.exports = router;
