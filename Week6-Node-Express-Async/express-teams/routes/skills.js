// need express
// need router
const express = require('express');
const router = express.Router();
// node will assume you are looking for index.js in a folder if you don't indicate
const db = require('../db');

// get /skills
router.get('', async (req, res, next) => {
  try {
    const data = await db.query('SELECT * FROM skills');
    return res.json(data.rows);
  } catch (err) {
    return next(err);
  }
});
// post /skills
router.post('', async (req, res, next) => {
  try {
    const data = await db.query(
      'INSERT INTO skills (title) VALUES ($1) RETURNING *',
      [req.body.title]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// patch /skills/id
router.patch('/:id', async (req, res, next) => {
  try {
    const data = await db.query(
      'UPDATE skills SET title=$1 WHERE id=$2 RETURNING *',
      [req.body.title, req.params.id]
    );
    return res.json(data.rows[0]);
  } catch (err) {
    return next(err);
  }
});
// delete /skills/id
router.delete('/:id', async (req, res, next) => {
  try {
    const data = await db.query('DELETE FROM skills WHERE id=$1', [
      req.params.id
    ]);
    return res.json({ message: 'DELETED' });
  } catch (err) {
    return next(err);
  }
});
// get /skills/id    show a skill with all the players with that skill
router.get('/:id', async (req, res, next) => {
  try {
    const skillData = await db.query('SELECT * FROM skills WHERE id=$1', [
      req.params.id
    ]);

    const playerNames = await db.query(
      `
        SELECT players.name FROM players 
            JOIN players_skills ON players.id=players_skills.player_id
            JOIN skills ON skills.id=players_skills.skill_id
        WHERE skills.id=$1
    `,
      [req.params.id]
    );

    const names = playerNames.rows.map(val => val.name);
    skillData.rows[0].players = names;
    return res.json(skillData.rows[0]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
