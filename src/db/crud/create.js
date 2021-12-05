let db = require('../dbConnection')

function query_checking_leader(project){
    if (project.leader == undefined) {
        return 'INSERT INTO projects (start, finish, name, description, state) VALUES (?, ?, ?, ?, ?);';
    }
    return 'INSERT INTO projects (start, finish, name, description, leader, state) VALUES (?, ?, ?, ?, ?, ?);';
}

function values_checking_leader(project){
    if (project.leader == undefined) {
        return [project.get_start(), project.get_finish(), project.get_name(), project.get_description(), project.get_state()];
    }
    return  [project.get_start(), project.get_finish(), project.get_name(), project.get_description(), project.get_leader(), project.get_state()];
}

function create_project(project){
    return new Promise( (resolve, reject) => {
        db.query({
            sql: query_checking_leader(project),
            timeout: 40000,
            values: values_checking_leader(project)
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results[0]);
    })})
}

function create_task(task){
    return new Promise( (resolve, reject) => {
        db.query({
            sql: 'INSERT INTO tasks (name, description,state, id_project) VALUES (?, ?, ?, ?);',
            timeout: 40000,
            values: [task.get_name(), task.get_description(),task.get_state(), task.get_project()]
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results[0]);
    })})
}

module.exports = { project : create_project, task : create_task };
