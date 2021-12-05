CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(50) NOT NULL,
    state VARCHAR(15) NOT NULL,
    id_project INT NOT NULL
);