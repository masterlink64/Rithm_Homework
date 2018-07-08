-- create a table for users
-- should have: first name, last name, email, photo

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  photo TEXT,
  current_company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE
);

INSERT INTO users
  (first_name, last_name, email, photo, current_company_id)
VALUES
  (Solid, Snake, snakes@gmail.com, photo.jpg, 1)
RETURNING *
adding a single user
-- (first_name, last_name, email, photo)
-- http POST localhost:3000/users first_name=Aloy last_name=Horizon email=zerodawn@gmail.com photo=https://d17omnzavs9b58.cloudfront.net/assets/article/2017/03/27/hzd_aloy_feature.jpg current_company_id=1
-- http POST localhost:3000/users first_name=Mario last_name=Tennis email=mario@gmail.com photo=https://vignette.wikia.nocookie.net/characterprofile/images/7/75/Mario.png/revision/latest?cb=20160103112702 current_company_id=2
-- http POST localhost:3000/users first_name=Yoshi last_name=World email=yoshi@gmail.com photo=https://pbs.twimg.com/media/ByzYhGzIIAE94Dy.jpg current_company_id=2
-- http POST localhost:3000/users first_name=Donkey last_name=Kong email=dk@gmail.com photo=dk.jpg current_company_id=2
-- http POST localhost:3000/users first_name=Steph last_name=Curry email=sc30@gmail.com photo=warriors.jpg current_company_id=4
finding all users
-- http localhost:3000/users

finding one user 
-- http localhost:3000/users/2

updating one user
-- http PATCH localhost:3000/users/2 first_name=new last_name=test email=hi@gmail.com photo=blah current_company_id=2

-- table for companies
CREATE TABLE companies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT
);

adding a single company
-- (name, logo)
-- http POST localhost:3000/companies name=Nintendo logo=nin.jpg
-- http POST localhost:3000/companies name=Sony logo=sony.jpg

patching a single company
-- http PATCH localhost:3000/companies/1 name=Nintestdo logo=ninja.jpg

delete a single company 
-- http DELETE localhost:3000/companies/3

Many
to MANY!!!
-- is just two O:M going through the join table.

-- create jobs table first
-- with a foregin key constraint from companies table (O:M)
CREATE TABLE jobs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  salary INTEGER,
  equity INTEGER,
  company_id INTEGER REFERENCES companies ON DELETE CASCADE
)

-- join table will allow us to do a (M:M) association
CREATE TABLE jobs_users
(
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs ON DELETE CASCADE,
  user_id INTEGER REFERENCES users ON DELETE CASCADE
);

adding one job
-- http POST localhost:3000/jobs title='Adventurer' salary=200000 equity=4 company_id=2
-- http POST localhost:3000/jobs title='Plumber' salary=300000 equity=5 company_id=1
-- http POST localhost:3000/jobs title='Software Engineer' salary=400000 equity=10 company_id=1
-- http POST localhost:3000/jobs title='Historian' salary=120000 equity=100 company_id=2
-- http POST localhost:3000/jobs title='Testing' salary=50000 equity=1 company_id=1

patching a single job
-- http PATCH localhost:3000/jobs/6 title='Basketball Player' salary=30000000 equity=2 company_id=4

-- inserting job and user association table

INSERT INTO jobs_users
  (job_id, user_id)
VALUES
  (1, 3),
  (2, 5),
  (3, 1),
  (5, 6),
  (3, 4),
  (4, 2),
  (6, 4),
  (1, 4)

-- and more


