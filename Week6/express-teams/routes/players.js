const express = require('express');
// merge params of true for when team id is from another
const router = express.Router({ mergeParams: true });
const db = require('../db/index');

// GET /teams/:team_id/players
router.get('', async (req, res, next) => {
  // get all players on a specific team
  // try catch block!
  try {
    const data = await db.query('SELECT * FROM players WHERE team_id=($1)', [
      req.params.team_id
    ]);
    return res.json(data.rows);
  } catch (err) {
    return next(err);
    // will respond with object
  }
});
// POST /teams/:team_id/players
router.post('', async (req, res, next) => {
  try {
    const data = await db.query(
      'INSERT INTO players(name, team_id) VALUES ($1, $2) RETURNING *',
      [req.body.name, req.params.team_id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// PATCH /teams/:team_id/players/:id
router.patch('/:id', async (req, res, next) => {
  try {
    const data = await db.query(
      'UPDATE players SET name=$1, team_id=$2 WHERE id=$3 RETURNING *',
      [req.body.name, req.params.team_id, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// DELETE /teams/:team_id/players/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const data = await db.query('DELETE FROM players WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'Deleted players' });
  } catch (err) {
    return next(err);
  }
});

// display all players on team
router.get('/:id', async (req, res, next) => {
  // GET the team by it's ID
  // GET all the players from team
  // query for one team
  try {
    const teamData = await db.query('SELECT * FROM teams WHERE id=$1', [
      req.params.id
    ]);
    // query to find all the players on a team
    const players = await db.query('SELECT * FROM players WHERE team_id=$1', [
      req.params.id
    ]);
    // creating a key value pair. value is ALL the players
    teamData.rows[0].players = players.rows;

    return res.json(teamData.rows[0]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
