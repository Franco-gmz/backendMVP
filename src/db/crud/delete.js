let db = require('../dbConnection')

// remove a project, its tasks, team, and teams from its tasks
function erase_project(project){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM projects WHERE id = $1;",[project.get_id()], (err, res) => {
            if (err) reject(err);    
        })
        db.query("SELECT id_project FROM task WHERE id_project = $1;",[project.get_id()], (err, res) => {
            if (err) reject(err);
            if(res){
                db.query("DELETE FROM task_teams WHERE id_task = ANY($1);",res.rows, (err, res) => {
                    if (err) reject(err);   
                })
            }   
        })
        db.query("DELETE FROM task WHERE id_project = $1;",[project.get_id()], (err, res) => {
            if (err) reject(err);    
        })
        
        db.query("DELETE FROM project_teams WHERE id_project = $1;",[project.get_id()], (err, res) => {
            if (err) reject(err);   
        })
        resolve();
    });   
}

// remove a task and its team
function erase_task(task){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM tasks WHERE id = $1;",[task.get_id()], (err, res) => {
            if (err){
                reject(err);
            }
        })
        db.query("DELETE FROM task_teams WHERE id_task = $1;",[task.get_id()], (err, res) => {
            if (err) reject(err);  
            resolve();
        })
    });   
}

// remove project team members
function erase_project_member(project){
    let id = project.get_id();
    return new Promise( (resolve, reject) => {
        project.get_team().forEach( (employee) => {
            db.query("DELETE FROM project_teams WHERE (id_project = $1 AND id_employee = $2);", [id, employee], (err, res) => {
            if (err) reject(err);
            resolve();    
            })
        })
    });   
}

function erase_task_member(task){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM task_teams WHERE (id_task = $1 AND id_employee = $2);", [task.get_id(), task.get_team()], (err, res) => {
            if (err) reject(err);
            resolve();    
        })
    });   
}

module.exports = { project : erase_project, task : erase_task, project_team : erase_project_member, task_team : erase_task_member };