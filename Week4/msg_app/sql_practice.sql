
BUT will have to create a username for the existing username column first
select lower(first_name) from users;
update users set username=lower(first_name);
alter table users alter column username not null;

ALTER TABLE users ADD COLUMN Username TEXT NOT NULL;

// pw just dont do NOT null
ALTER TABLE users ADD COLUMN Password TEXT;


<li><a href="{{ url_for('show', id=user.id) }}">{{ user.first_name }} {{ user.last_name }}</a></li>
      <ul>
        <li><a href="{{ url_for('edit', id=user.id) }}">Edit this user!</a></li>
        <li><a href="{{ url_for('msg_new', id=user.id) }}">Add new message with this user!</a></li>
        <li><a href="{{ url_for('msg_index', id=user.id) }}">See all messages from this user</a></li>
