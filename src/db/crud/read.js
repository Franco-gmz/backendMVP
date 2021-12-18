let db = require('../dbConnection')

function read_project(project){
    return new Promise( (resolve,reject) => {
        db.query("SELECT id, name, description, TO_CHAR(start, 'dd/mm/yyyy') as start, TO_CHAR(finish, 'dd/mm/yyyy') as finish, state, leader, team FROM projects LEFT JOIN (SELECT id_project, array_agg(id_employee) as team FROM project_teams group by id_project) as teams ON projects.id = teams.id_project WHERE id = $1;",[project.get_id()] ,(err, res) => {
            if (err) reject(err);
            if(res != undefined) resolve(res.rows);
            else resolve();    
        })
    });   
}

// read all projects
function read_projects(){
    return new Promise( (resolve,reject) => {
        db.query("SELECT id, name, description, TO_CHAR(start, 'dd/mm/yyyy') as start, TO_CHAR(finish, 'dd/mm/yyyy') as finish, state, leader, team FROM projects LEFT JOIN (SELECT id_project, array_agg(id_employee) as team FROM project_teams group by id_project) as teams ON projects.id = teams.id_project;", (err, res) => {
            if (err) reject(err);
            if(res != undefined) resolve(res.rows);
            else resolve();    
        })
    });   
}

// read tasks of a project
function read_task_set(project){
    return new Promise( (resolve,reject) => {
        db.query("SELECT id, name, description, state, team FROM tasks LEFT JOIN (SELECT id_task, array_agg(id_employee) as team FROM task_teams GROUP BY id_task) as teams ON tasks.id = teams.id_task WHERE id_project = $1;",[project.get_id()], (err, res) => {
            if (err) reject(err);
            if(res != undefined) resolve(res.rows);
            else resolve();    
        })
    });   
}

// read only one task
function read_task(task){
    return new Promise( (resolve,reject) => {
        db.query("SELECT id, name, description, state, id_project FROM tasks WHERE id = $1;",[task.get_id()], (err, res) => {
            if (err) reject(err);
            if(res != undefined) resolve(res.rows);
            else resolve();    
        })
    });   
}

// read all existing tasks
function read_all_tasks(){
    return new Promise( (resolve,reject) => {
        db.query("SELECT * FROM tasks;", (err, res) => {
            if (err) reject(err);
            if(res != undefined) resolve(res.rows);
            else resolve();    
        })
    }); 
}

module.exports = { project:read_project, projects : read_projects, taskSet : read_task_set, task: read_task, all_tasks: read_all_tasks};