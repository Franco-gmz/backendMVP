CREATE TABLE project_teams (
    id_project INT UNSIGNED,
    id_employee INT UNSIGNED,
    FOREIGN KEY (id_project) REFERENCES projects(id),
    PRIMARY KEY (id_project, id_employee)
);