let db = require('../dbConnection')

function create_query(table, fields, values){
    let querySQL = 'UPDATE ' + table + ' SET ';
    fields.forEach( function(field,i){
        querySQL = querySQL + field + ' = ' + "'" + values[i] + "' ";
        if (i < fields.length - 1) querySQL = querySQL + ', ';
    });
    querySQL = querySQL + ' WHERE id = ?;';
    return querySQL;
}

function update_project(project, fields, values){
    let query = create_query('projects', fields, values);
    return new Promise( (resolve,reject) => {
        db.query(query, [project.id], (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve();
    })})
}

function update_task(task, fields, values){
    let query = create_query('tasks', fields, values);
    return new Promise( (resolve,reject) => {
        db.query(query, [task.id], (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve();
    })})
}

function update_project_team(project){
    return new Promise( (resolve, reject) => {
        project.get_team().forEach( (employee) => {
            db.query({
                sql: 'INSERT INTO project_teams (id_project, id_employee) VALUES (?, ?);',
                timeout: 40000,
                values: [project.get_id(), employee]
            }, (error, results, fields) => {
                if (error){
                    console.log("Codigo de error: ", error.code, "\n");
                    console.log("Mensaje: ", error.sqlMessage, "\n");
                    reject(error.errno);
                }
        })})
        resolve();
    })
}

function update_task_team(task){
    return new Promise( (resolve, reject) => {
        task.get_team().forEach( (employee) => {
            db.query({
                sql: 'INSERT INTO task_teams (id_task, id_employee) VALUES (?, ?);',
                timeout: 40000,
                values: [task.get_id(), employee]
            }, (error, results, fields) => {
                if (error){
                    console.log("Codigo de error: ", error.code, "\n");
                    console.log("Mensaje: ", error.sqlMessage, "\n");
                    reject(error.errno);
                }
        })})
        resolve();
    })
}

module.exports = { project : update_project, task : update_task, project_team: update_project_team, task_team: update_task_team };