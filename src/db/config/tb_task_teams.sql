CREATE TABLE task_teams (
    id_task INT UNSIGNED,
    id_employee INT UNSIGNED,
    PRIMARY KEY (id_task, id_employee)
);