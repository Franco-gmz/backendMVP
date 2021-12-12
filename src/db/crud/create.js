let db = require('../dbConnection')

function project_query(){
    return 'INSERT INTO projects (start, finish, name, description, leader,state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING TO_CHAR(start, "dd/mm/yyyy") as start, TO_CHAR(finish, "dd/mm/yyyy") as finish, name, description, leader, state;';
}

function project_values(project){
    let leader = project.leader == undefined ? 0 : project.get_leader();
    return [project.get_start(), project.get_finish(), project.get_name(), project.get_description(), leader, project.get_state()];
}

function create_project(project){
    return new Promise( (resolve, reject) => {
        db.query(project_query(), project_values(project), (err, res) => {
            if (err) reject(err);
            console.log("res:\n",res)
            resolve(res.rows[0]);    
        })
    })
}

function create_task(task){
    return new Promise( (resolve, reject) => {
        db.query("INSERT INTO tasks (name, description,state, id_project) VALUES ($1, $2, $3, $4) RETURNING id;",[task.get_name(),task.get_description(),task.get_state(),task.get_project()], (err, res) => {
            if (err) reject(err);
            resolve(res.rows[0]);    
        })
    })
}

module.exports = { project : create_project, task : create_task };
