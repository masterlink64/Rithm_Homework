CREATE TABLE games (id SERIAL PRIMARY KEY,
  name TEXT,
  rating INTEGER,
  system TEXT);

INSERT INTO games (name, system, rating) VALUES ('Zelda: Breath of the Wild', 'Switch', 97), ('Horizon Zero Dawn', 'PS4', 89), ('Super Mario Odyssey', 'Switch', 97), ('Injustice 2', 'Xbox One', 89)