CREATE TABLE players_skills
(
  id SERIAL PRIMARY KEY,
  player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE
);

INSERT INTO players_skills
  (player_id, skill_id)
VALUES
  (3, 1),
  (3, 3),
  (2, 3)

// join table

SELECT *
FROM players p JOIN players_skills ps ON p.id=ps.player_id;

//

SELECT *
FROM players p JOIN players_skills ps ON p.id = ps.player_id JOIN skills s ON s.id=ps.skill_id;

// many to many

SELECT players.name
FROM players
  JOIN players_skills ON players.id = players_skills.player_id
  JOIN skills ON skills.id=players_skills.skills_id
WHERE skills.id=$1