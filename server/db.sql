CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

INSERT INTO t(todo_id,description) VALUES(1,"Go to gym"); 