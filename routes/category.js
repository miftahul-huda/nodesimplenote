var express = require('express');
var router = express.Router();

const CategoryLogic = require('../modules/logic/categorylogic')


router.post('/create', function (req, res){
  let category = req.body;

  CategoryLogic.create(category).then(function (savedCategory)
  {
    res.send(savedCategory);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('', function (req, res){

  CategoryLogic.findAll().then(function (categorys)
  {
    res.send(categorys);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})



router.get('/:search', function (req, res){
  let search = req.params.search;

  CategoryLogic.findAll(search).then(function (categorys)
  {
    res.send(categorys);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/get/:id', function (req, res){
  let id = req.params.id;

  CategoryLogic.get(id).then(function (category)
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

  CategoryLogic.update(id, category).then(function (savedCategory)
  {
    res.send(savedCategory);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

router.get('/delete/:id', function (req, res){
  let id = req.params.id;

  CategoryLogic.delete(id).then(function (result)
  {
    res.send(result);
  }).catch(function (err){
    console.log("error")
    res.send(err);
  })
})

module.exports = router;
