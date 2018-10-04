DROP DATABASE IF EXISTS  "companies-db";
CREATE DATABASE "companies-db";
\c "companies-db"
CREATE TABLE companies
(
  id SERIAL PRIMARY KEY,
  handle TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  logo TEXT
);
CREATE TABLE jobs
(
  id SERIAL PRIMARY KEY,
  title TEXT,
  salary TEXT,
  equity FLOAT,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE
);
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  photo TEXT,
  company_id INTEGER REFERENCES companies (id) ON DELETE SET NULL
);
-- joins table to allow jobs and users to reference each other
CREATE TABLE jobs_users
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES companies (id) ON DELETE CASCADE
);


INSERT INTO companies
  (handle, password, name, logo)
VALUES
  ('Sony', 'Sony', 'Sony', 'https://vignette.wikia.nocookie.net/clubpenguin/images/c/c5/Sony-logo-dsfdsfs.jpg/revision/latest?cb=20150124144941'),
  ('Nintendo', 'test1', 'Nintendo', 'http://logok.org/wp-content/uploads/2014/12/Nintendo-logo-red.png');

INSERT INTO jobs
  (title, salary, equity, company_id)
VALUES
  ('Adventurer', 200000, 4.3, 2),
  ('Plumber', 300000, 5, 1);

-- pw will need to be updated because it won't be hashed
INSERT INTO users
  (first_name, last_name, email, photo, company_id, password, username)
VALUES
  ('Aloy', 'Horizon', 'zerodawn@gmail.com',
    'https://d17omnzavs9b58.cloudfront.net/assets/article/2017/03/27/hzd_aloy_feature.jpg', 1, 'Aloy', 'hunter1'),
  ('Mario', 'Tennis', 'mario@gmail.com',
    'https://vignette.wikia.nocookie.net/characterprofile/images/7/75/Mario.png/revision/latest?cb=20160103112702', 2, 'Mario', 'plumber2')
--  psql < schema.sql
\q