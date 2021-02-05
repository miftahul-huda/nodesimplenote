var express = require('express');
var router = express.Router();

const ProjectLogic = require('../modules/logic/projectlogic')


router.post('/create', function (req, res){
  let project = req.body;

  var session = req.session;
  project.user = session.email;

  console.log("project/create")
  console.log(project);

  ProjectLogic.create(project, {email: session.email }).then(function (savedProject)
  {
    res.send(savedProject);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  var session = req.session;
  ProjectLogic.findAll({ email: session.email }).then(function (projects)
  {
    res.send(projects);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/:search', function (req, res){
  let search = req.params.search;
  var session = req.session;

  ProjectLogic.findAll(search, { email: session.email }).then(function (projects)
  {
    res.send(projects);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;

  ProjectLogic.get(id, { email: session.email }).then(function (project)
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
  var session = req.session;

  ProjectLogic.update(id, project, { email: session.email }).then(function (savedProject)
  {
    res.send(savedProject);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;

  ProjectLogic.delete(id, { email: session.email }).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
