var express = require('express');
var router = express.Router();

const ProjectLogic = require('../modules/logic/projectlogic')


router.post('/create', function (req, res){
  let project = req.body;

  console.log("project/create")
  console.log(project);

  ProjectLogic.create(project).then(function (savedProject)
  {
    res.send(savedProject);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  ProjectLogic.findAll().then(function (projects)
  {
    res.send(projects);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/:search', function (req, res){
  let search = req.params.search;

  ProjectLogic.findAll(search).then(function (projects)
  {
    res.send(projects);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;

  ProjectLogic.get(id).then(function (project)
  {
    res.send(project);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let project = req.body;
  let id = req.params.id;

  ProjectLogic.update(id, project).then(function (savedProject)
  {
    res.send(savedProject);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  ProjectLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
