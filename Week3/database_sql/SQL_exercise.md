Part 1 - CRUD Exercises
Write the SQL commands necessary to do the following:

Create a database called first_assignment.

- CREATE DATABASE first_assignment

Connect to that database.
\c first_assignment

Create a table called products with columns for:
id, which should be a unique auto-incremementing integer
name, which should be text, and not nullable
price, which should be numeric, and greater than zero
can_be_returned, which should be a boolean, and not nullable

- CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC CHECK (price >0),
  can_be_returned BOOLEAN NOT NULL
  );

Add a product to the table with the name of "chair", price of 44.00, and can_be_returned of false.

- INSERT INTO products (name, price, can_be_returned)
  VALUES ('chair', 44.00, 'f');

Add a product to the table with the name of "stool", price of 25.99, and can_be_returned of true.

- INSERT INTO products (name, price, can_be_returned)
  VALUES ('stool', 25.99, 't');

Add a product to the table with the name of "table", price of 124.00, and can_be_returned of false.

- INSERT INTO products (name, price, can_be_returned)
  VALUES ('stool', 25.99, 't');

Display all of the rows and columns in the table.

- SELECT \* FROM products;

Display all of the names of the products.

- SELECT name FROM products;

Display all of the names and prices of the products.

- SELECT name, price FROM PRODUCTS;
  Add a new product - make up whatever you would like!
- INSERT INTO products
  (name, price, can_be_returned)
  VALUES
  ('TV', 500.00, 't');

Display only the products that can\*be_returned.
\*\*\* All my selects have \ slashes on them added by VSCode? \_\*\*

- SELECT \* FROM products WHERE can_be_returned='t';

Display only the products that have a price less than 44.00.

- SELECT \* FROM products WHERE price < 44.00;

Display only the products that have a price in between 22.50 and 99.99.

- SELECT \* FROM products WHERE price BETWEEN 22.50 AND 99.99;

There's been a change in company policy, and now all tables are returnable. Update the database accordingly.

- UPDATE products SET can_be_returned = 't' WHERE name = 'table';

There's a sale going on: Everything is $20 off! Update the database accordingly.

- UPDATE products SET price = price - 20;

Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria.

- DELETE FROM products WHERE price < 25;

And now the sale is over. For the remaining products, increase their price by $20.

- UPDATE products SET price = price + 20;

Part 2 - Operators and Aggregates

Write the following queries to perform the following:

Find the names of the top five most caloric snacks.

- SELECT name
  FROM snacks
  ORDER BY calories
  DESC
  LIMIT 5;

Find the names of the 3 cheapest snacks.

- SELECT name
  FROM snacks
  ORDER BY price
  LIMIT 3;

Calculate the total calories for all the snacks. Call this column total_calories.

- SELECT SUM(calories)
  AS total_calories
  FROM snacks;
  Calculate the average price for all the snacks. Call this column average_price.
- SELECT AVG(price)
  AS average_price
  FROM snacks;

Calculate the lowest price for all the snacks. Call this column lowest_price.

- SELECT MIN(price)
  AS lowest_price
  FROM snacks;

Calculate the highest price for all the snacks. Call this column highest_price.

- SELECT MAX(price)
  AS highest_price
  FROM snacks;

Find the count for each kind of candy in the table. Your output should look like this:

- SELECT kind, COUNT(kind)
  FROM snacks
  GROUP BY kind;

/_
kind | count
-------------+-------
frozen | 1
chips | 5
baked goods | 5
yogurt | 1
beverage | 2
candy bar | 5
fruit snack | 2
_/
Find the count of each kind of candy where the count is greater than one. Your output should look like this:

- SELECT kind, COUNT(kind)
  FROM snacks
  GROUP BY kind
  HAVING COUNT(kind) > 1;

/_
kind | count
-------------+-------
chips | 5
baked goods | 5
beverage | 2
candy bar | 5
fruit snack | 2
_/
Find the average number of calories for each kind of candy and call the name of your column that contains the average average_calories. Order your output by the kind of candy in ascending order. Your output should look like this.

- SELECT kind, ROUND(AVG(calories))
  AS average_calories
  FROM snacks
  GROUP BY kind
  ORDER BY kind;

/_
kind | average_calories
-------------+------------------
baked goods | 298
beverage | 210
candy bar | 340
chips | 306
frozen | 2000
fruit snack | 320
yogurt | 260
_/
