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

adding a single user
-- (first_name, last_name, email, photo)
-- http POST localhost:3000/users first_name=Aloy, last_name=Horizon, email=zerodawn@gmail.com, photo=https://d17omnzavs9b58.cloudfront.net/assets/article/2017/03/27/hzd_aloy_feature.jpg, current_company_id=1
-- http POST localhost:3000/users first_name=Mario, last_name=Tennis, email=mario@gmail.com, photo=https://vignette.wikia.nocookie.net/characterprofile/images/7/75/Mario.png/revision/latest?cb=20160103112702, current_company_id=2
-- http POST localhost:3000/users first_name=Yoshi, last_name=World, email=yoshi@gmail.com, photo=https://pbs.twimg.com/media/ByzYhGzIIAE94Dy.jpg, current_company_id=3
finding all users
-- http localhost:3000/users

finding one user 
-- http localhost:3000/users/2

updating one user
-- http PATCH localhost:3000/users/2 first_name=new, last_name=test, email=hi@gmail.com, photo=blah

-- table for companies
CREATE TABLE companies
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT
);