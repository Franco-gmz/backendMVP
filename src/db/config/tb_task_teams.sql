CREATE TABLE task_teams (
    id_task INT UNSIGNED,
    id_employee INT UNSIGNED,
    FOREIGN KEY (id_task) REFERENCES tasks(id),
    PRIMARY KEY (id_task, id_employee)
);