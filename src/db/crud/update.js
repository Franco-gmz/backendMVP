let db = require('../dbConnection')

function create_query(table, fields, values){
    let querySQL = 'UPDATE ' + table + ' SET ';
    fields.forEach( function(field,i){
        querySQL = querySQL + field + ' = ' + "'" + values[i] + "' ";
        if (i < fields.length - 1) querySQL = querySQL + ', ';
    });
    querySQL = querySQL + ' WHERE id = $1;';
    return querySQL;
}

function update_project(project, fields, values){
    let query = create_query('projects', fields, values);
    return new Promise( (resolve,reject) => {
        db.query(query,[project.id], (err, res) => {
            if (err) reject(err);
            resolve(res.rows);    
        })}
    )}

function update_task(task, fields, values){
    let query = create_query('tasks', fields, values);
    return new Promise( (resolve,reject) => {
        db.query(query,[task.id], (err, res) => {
            if (err) reject(err);
            resolve(res.rows);    
        })}
    )}

function update_project_team(project){
    return new Promise( (resolve, reject) => {
        project.get_team().forEach( (employee) => {

            db.query('INSERT INTO project_teams (id_project, id_employee) VALUES ($1, $2);',[project.get_id(), employee], (err, res) => {
                if (err) reject(err);   
            })}
        )
        resolve();
    })
}

function update_task_team(task){
    return new Promise( (resolve, reject) => {
        task.get_team().forEach( (employee) => {
            db.query('INSERT INTO task_teams (id_task, id_employee) VALUES ($1, $2);',[task.get_id(), employee], (err, res) => {
                if (err) reject(err);   
            })}
        )
        resolve();
    })
}

module.exports = { project : update_project, task : update_task, project_team: update_project_team, task_team: update_task_team };