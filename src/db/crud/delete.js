let db = require('../dbConnection')

function erase_project(project){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM projects WHERE id = $1;",[project.get_id()], (err, res) => {
            if (err) reject(err);
            resolve(res.rows);    
        })
    });   
}

function erase_task(task){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM tasks WHERE id = $1;",[task.get_id()], (err, res) => {
            if (err) reject(err);
            resolve(res.rows);    
        })
    });   
}

function erase_project_member(project){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM project_teams WHERE (id_project = $1 AND id_employee = $2);", [project.get_id(), project.get_team()], (err, res) => {
            if (err) reject(err);
            resolve(res.rows);    
        })
    });   
}

function erase_task_member(task){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM task_teams WHERE (id_task = $1 AND id_employee = $2);", [task.get_id(), task.get_team()], (err, res) => {
            if (err) reject(err);
            resolve(res.rows);    
        })
    });   
}

module.exports = { project : erase_project, task : erase_task, project_team : erase_project_member, task_team : erase_task_member };