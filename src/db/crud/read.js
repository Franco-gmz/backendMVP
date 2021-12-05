let db = require('../dbConnection')

function read_project(){
    return new Promise( (resolve,reject) => {
        db.query({
            sql: "SELECT id, name, description, TO_CHAR(start, 'dd/mm/yyyy') as start, TO_CHAR(finish, 'dd/mm/yyyy') as finish, state, leader, team FROM projects LEFT JOIN (SELECT id_project, array_agg(id_employee) as team FROM project_teams group by id_project) as teams ON projects.id = teams.id_project;",
            timeout: 40000
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error);
            }
            resolve(results)
        })
    });   
}

function read_task(project){
    return new Promise( (resolve,reject) => {
        db.query({
            sql: 'SELECT id, name, description, state, team FROM tasks LEFT JOIN (SELECT id_task, group_concat(id_employee) as team FROM task_teams GROUP BY id_task) as teams ON tasks.id = teams.id_task WHERE id = ?;',
            timeout: 40000,
            values: [project.get_id()]
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results)
        })
    });   
}

module.exports = { project : read_project, task : read_task};