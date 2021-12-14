var router = require('express').Router();

// Entities
var Project = require('../db/entity/project.js')
var Task = require('../db/entity/task.js')


// CRUD
let create = require('../db/crud/create.js')
let read = require('../db/crud/read.js')
let erase = require('../db/crud/delete.js')
let update = require('../db/crud/update.js')

// Projects endpoints

// get all projects and their teams
router.get('/project', function(req,res){  
    read.project()
        .then( (results) => res.status(200).send({results: results}))
        .catch( (errcode) => res.status(500).send({results:"Ha ocurrido un error"}))
});

// create a project
router.post('/project', function(req,res){
    let project = new Project(req.body)
    create.project(project)
          .then( (createdProject) => res.status(200).send({results: createdProject}))
          .catch( errcode => {
              console.log(errcode)
              res.status(500).send({results:"Ha ocurrido un error"})})

});

// update project
router.put('/project', function(req,res){
    let project = new Project(req.body)
    update.project(project, req.body.fields, req.body.values)
          .then( () => res.status(200).send({results: project }))
          .catch( errcode => res.status(500).send({results:"Ha ocurrido un error"}))     
});

// delete project
router.delete('/project/:id', function(req,res){
    let project = new Project(req.params)
    erase.project(project)
         .then( () => res.status(200).send({results: "El proyecto ha sido eliminado correctamente"}))
         .catch( errcode => res.status(500).send({results:"Ha ocurrido un error"}))
});

// Task endpoints

// create task
router.post('/task', function(req,res){
    let task = new Task(req.body)
    create.task(task)
          .then( (createdTask) => res.status(200).send({task: createdTask}))
          .catch( (err) => res.status(500).send({results:"Ha ocurrido un error"}))
});

// get task by its id
router.get('/task/:id', function(req,res){  
    let task = new Task(req.params)
    read.task(task)
        .then( (results) => res.status(200).send({results: results}))
        .catch( errcode => res.status(500).send({results:"Ha ocurrido un error"}))
});

// get all tasks in a project by its id
router.get('/task/set/:id', function(req,res){  
    let project = new Project(req.params)
    read.taskSet(project)
        .then( (results) => res.status(200).send({results: results}))
        .catch( errcode => res.status(500).send({results:"Ha ocurrido un error"}))
});

// update a task
router.put('/task', function(req,res){
    let task = new Task(req.body)
    update.task(task, req.body.fields, req.body.values)
          .then( () => res.status(200).send({results: task}))
          .catch( (errcode) => res.status(500).send({results:"Ha ocurrido un error"}))
        
});

// delete a task
router.delete('/task/:id', function(req,res){
    let task = new Task(req.params)
    erase.task(task)
         .then( () => res.status(200).send({results: "La tarea ha sido eliminada correctamente"}))
         .catch( errcode => res.status(500).send({results:"Ha ocurrido un error"}))
});

// Team project

// update team  of a project
router.put('/project/team', function(req,res){
    let project = new Project(req.body)
    update.project_team(project)
          .then( (result) => res.status(200).send({results: result}))
          .catch( errcode => res.status(500).send({results:"Ha ocurrido un error"}))
});

// delete team members of a project
router.delete('/project/team', function(req,res){
    let project = new Project(req.body)
    erase.project_team(project)
         .then( () => res.status(200).send({results: "Se ha eliminado correctamente"}))
         .catch( (errcode) => res.status(500).send({results:"Ha ocurrido un error"}))
});

// Team task

// update team members of a task
router.put('/task/team', function(req,res){
    let task = new Task(req.body)
    update.task_team(task)
          .then( (result) => res.status(200).send({results: result}))
          .catch( (errcode) => res.status(500).send({results:"Ha ocurrido un error"}))
});

// delete team members of a task
router.delete('/task/team', function(req,res){
    let task = new Task(req.body)
    erase.task_team(task)
         .then( () => res.status(200).send({results: "OK"}))
         .catch( (errcode) => res.status(500).send({results:"Ha ocurrido un error"}))
});

module.exports = router;