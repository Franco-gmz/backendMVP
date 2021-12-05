let db = require('../dbConnection')

function erase_project(project){
    return new Promise( (resolve, reject) => {
        db.query({
            sql: 'DELETE FROM projects WHERE id = ?;',
            timeout: 40000,
            values: [project.get_id()]
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results[0])
        })
    });   
}

function erase_task(task){
    return new Promise( (resolve, reject) => {
        db.query({
            sql: 'DELETE FROM tasks WHERE id = ?;',
            timeout: 40000,
            values: [task.get_id()]
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results[0])
        })
    });   
}

function erase_project_member(project){
    return new Promise( (resolve, reject) => {
        db.query({
            sql: 'DELETE FROM project_teams WHERE (id_project = ? AND id_employee = ?);',
            timeout: 40000,
            values: [project.get_id(), project.get_team()]
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results[0])
        })
    });   
}

function erase_task_member(task){
    return new Promise( (resolve, reject) => {
        db.query({
            sql: 'DELETE FROM task_teams WHERE (id_task = ? AND id_employee = ?);',
            timeout: 40000,
            values: [task.get_id(), task.get_team()]
        }, (error, results, fields) => {
            if (error){
                console.log("Codigo de error: ", error.code, "\n");
                console.log("Mensaje: ", error.sqlMessage, "\n");
                reject(error.errno);
            }
            resolve(results[0])
        })
    });   
}

module.exports = { project : erase_project, task : erase_task, project_team : erase_project_member, task_team : erase_task_member };