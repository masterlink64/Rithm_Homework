
BUT will have to create a username for the existing username column first
select lower(first_name) from users;
update users set username=lower(first_name);
alter table users alter column username not null;

ALTER TABLE users ADD COLUMN Username TEXT NOT NULL;

// pw just dont do NOT null
ALTER TABLE users ADD COLUMN Password TEXT;
