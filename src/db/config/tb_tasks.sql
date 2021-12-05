CREATE TABLE tasks (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(50) NOT NULL,
    state VARCHAR(15) NOT NULL,
    id_project INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_project) REFERENCES projects(id)
);