var Project = require('../db/entity/project.js')
var Task = require('../db/entity/task.js')
var router = require('express').Router();

//CRUD
let create = require('../db/crud/create.js')
let read = require('../db/crud/read.js')
let erase = require('../db/crud/delete.js')
let update = require('../db/crud/update.js')

//PROJECTS

router.get('/project', function(req,res){  
    read.project()
        .then( (results) => res.status(200).send({results: results}))
        .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

router.post('/project', function(req,res){
    let project = new Project(req.body)
    create.project(project)
          .then( (result) => res.status(200).send({results: result}))
          .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

router.put('/project', function(req,res){
    let project = new Project(req.body)
    update.project(project, req.body.fields, req.body.values)
          .then( () => res.status(200).send({results: "OK"}))
          .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
        
});

router.delete('/project', function(req,res){
    let project = new Project(req.body)
    erase.project(project)
         .then( () => res.status(200).send({results: "OK"}))
         .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

//TASKS

router.post('/task', function(req,res){
    let task = new Task(req.body)
    create.task(task)
          .then( (result) => res.status(200).send({results: result}))
          .catch( (err) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

router.get('/task', function(req,res){  
    let project = new Project(req.body)
    read.task(project)
        .then( (results) => res.status(200).send({results: results}))
        .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

router.put('/task', function(req,res){
    let task = new Task(req.body)
    update.task(task, req.body.fields, req.body.values)
          .then( () => res.status(200).send({results: "OK"}))
          .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
        
});

router.delete('/task', function(req,res){
    let task = new Task(req.body)
    erase.task(task)
         .then( () => res.status(200).send({results: "OK"}))
         .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

// PROJECT TEAMS

router.put('/project/team', function(req,res){
    let project = new Project(req.body)
    update.project_team(project)
          .then( (result) => res.status(200).send({results: result}))
          .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

router.delete('/project/team', function(req,res){
    let project = new Project(req.body)
    erase.project_team(project)
         .then( () => res.status(200).send({results: "OK"}))
         .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

// TASK TEAM

router.put('/task/team', function(req,res){
    let task = new Task(req.body)
    update.task_team(task)
          .then( (result) => res.status(200).send({results: result}))
          .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

router.delete('/task/team', function(req,res){
    let task = new Task(req.body)
    erase.task_team(task)
         .then( () => res.status(200).send({results: "OK"}))
         .catch( (errcode) => res.status(500).send({results:"Error"})) //Actuar segun #errcode
});

module.exports = router;