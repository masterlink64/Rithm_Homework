const express = require('express');
const router = express.Router();
const db = require('../db/index');

// GET /teams
// next to handle errors
// need async await
// http localhost:3000/teams
router.get('', async (req, res, next) => {
  // get me all of the teams! run all SQL
  // anything after await keywords is a PROMISE!!!!
  const data = await db.query('SELECT * FROM teams');
  return res.json(data.rows);
});

// http POST localhost:3000/teams name=whatever
router.post('', async (req, res, next) => {
  // need to prevent SQL injection
  const data = await db.query(
    'INSERT INTO teams (name) VALUES ($1) RETURNING *',
    [req.body.name]
  );
  return res.json(data.rows);
});

// PATCH /teams/:id --> updates team
router.patch('/:id', async (req, res, next) => {
  const data = await db.query(
    'UPDATE teams SET name=($1) WHERE id=($2) RETURNING *',
    [req.body.name, req.params.id]
  );
  return res.json(data.rows[0]);
});

// DELETE /teams/:id --> deletes a team
router.delete('/:id', async (req, res, next) => {
  const data = await db.query('DELETE FROM teams WHERE id=($1)', [
    req.params.id
  ]);
  return res.json({ message: 'Deleted' });
});

// BONUS - GET /teams/:id
// responds with an object:
/*
{
  id: 1,
  name: 'warriors'
  players: [{
    id: 1,
    name: 'Draymond Green'
  }]
}
 */

// exporting all these routes
module.exports = router;
