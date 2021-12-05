CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    start DATE NOT NULL,
    finish DATE NOT NULL,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(50) NOT NULL,
    leader INT,
    state VARCHAR(15) NOT NULL
);