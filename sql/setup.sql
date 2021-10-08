DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

INSERT INTO users (email, password_hash)
VALUES ('izzie@dog.com', 'does-this-work?')
RETURNING *