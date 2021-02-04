var express = require('express');
var router = express.Router();

const NoteLogic = require('../modules/logic/notelogic')


router.post('/create', function (req, res){
  let note = req.body;

  console.log("note/create")
  console.log(note);

  NoteLogic.create(note).then(function (savedNote)
  {
    res.send(savedNote);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  NoteLogic.findAll().then(function (connections)
  {
    res.send(connections);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/:search', function (req, res){
  let search = req.params.search;

  NoteLogic.findAll(search).then(function (connections)
  {
    res.send(connections);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;

  NoteLogic.get(id).then(function (note)
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

  NoteLogic.update(id, note).then(function (savedNote)
  {
    res.send(savedNote);
  }).catch(function (err){
    console.note("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  NoteLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
