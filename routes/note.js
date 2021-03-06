var express = require('express');
var router = express.Router();

const NoteLogic = require('../modules/logic/notelogic')


router.post('/create', function (req, res){
  let note = req.body;
  var session = req.session;
  note.user = session.email;

  console.log("note/create")
  console.log(note);

  NoteLogic.create(note, {email: session.email }).then(function (savedNote)
  {
    res.send(savedNote);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  var session = req.session;
  NoteLogic.findAll({ email: session.email }).then(function (notes)
  {
    res.send(notes);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/find-by-project-category/:project/:category', function (req, res){
  var session = req.session;
  var category = req.params.category;
  var project = req.params.project;

  NoteLogic.findByProjectCategory(project, category, { email: session.email }).then(function (notes)
  {
    res.send(notes);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/:search', function (req, res){
  let search = req.params.search;
  var session = req.session;
  NoteLogic.findByKeyword(search, { email: session.email }).then(function (notes)
  {
    res.send(notes);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/find-by-project-category/:search/:project/:category', function (req, res){
  let search = req.params.search;
  var session = req.session;
  var category = req.params.category;
  var project = req.params.project;

  NoteLogic.findByKeywordProjectCategory(search, project, category, { email: session.email }).then(function (notes)
  {
    res.send(notes);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;
  NoteLogic.get(id, { email: session.email }).then(function (note)
  {
    res.send(note);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/share/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;
  NoteLogic.share(id).then(function (note)
  {
    res.send(note);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let note = req.body;
  let id = req.params.id;
  var session = req.session;

  NoteLogic.update(id, note, { email: session.email }).then(function (savedNote)
  {
    res.send(savedNote);
  }).catch(function (err){
    console.note("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;

  NoteLogic.delete(id, { email: session.email }).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
