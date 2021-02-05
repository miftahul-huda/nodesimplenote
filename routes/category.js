var express = require('express');
var router = express.Router();

const CategoryLogic = require('../modules/logic/categorylogic')


router.post('/create', function (req, res){
  let category = req.body;

  var session = req.session;
  category.user = session.email;

  CategoryLogic.create(category, {email: session.email }).then(function (savedCategory)
  {
    res.send(savedCategory);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  var session = req.session;
  CategoryLogic.findAll({email: session.email}).then(function (categorys)
  {
    res.send(categorys);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})



router.get('/:search', function (req, res){
  let search = req.params.search;
  var session = req.session;

  CategoryLogic.findAll(search, {email: session.email}).then(function (categorys)
  {
    res.send(categorys);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;

  CategoryLogic.get(id, {email: session.email}).then(function (category)
  {
    res.send(category);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.post('/update/:id', function (req, res){
  let category = req.body;
  let id = req.params.id;
  var session = req.session;

  CategoryLogic.update(id, category, {email: session.email}).then(function (savedCategory)
  {
    res.send(savedCategory);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;
  var session = req.session;

  CategoryLogic.delete(id, {email: session.email}).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
