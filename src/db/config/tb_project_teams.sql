CREATE TABLE project_teams (
    id_project INT UNSIGNED,
    id_employee INT UNSIGNED,
    PRIMARY KEY (id_project, id_employee)
);