let db = require('../dbConnection')

function query_checking_leader(project){
    if (project.leader == undefined) {
        return 'INSERT INTO projects (start, finish, name, description, state) VALUES ($1, $2, $3, $4, $5);';
    }
    return 'INSERT INTO projects (start, finish, name, description, leader, state) VALUES ($1, $2, $3, $4, $5, $6);';
}

function values_checking_leader(project){
    if (project.leader == undefined) {
        return [project.get_start(), project.get_finish(), project.get_name(), project.get_description(), project.get_state()];
    }
    return  [project.get_start(), project.get_finish(), project.get_name(), project.get_description(), project.get_leader(), project.get_state()];
}

function create_project(project){
    console.log("PROYECTO:\n",project);
    return new Promise( (resolve, reject) => {
        db.query(query_checking_leader(project),values_checking_leader(project), (err, res) => {
            if (err){
                reject(err);
            }
            resolve();    
        })
    })
}

function create_task(task){
    return new Promise( (resolve, reject) => {
        db.query("INSERT INTO tasks (name, description,state, id_project) VALUES ($1, $2, $3, $4) RETURNING id;",[task.get_name(),task.get_description(),task.get_state(),task.get_project()], (err, res) => {
            if (err) reject(err);
            resolve(res.rows[0].id);    
        })
    })
}

module.exports = { project : create_project, task : create_task };
