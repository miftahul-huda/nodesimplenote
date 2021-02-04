var express = require('express');
var router = express.Router();
const path = require('path');

router.get("/notes", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "notelist");
    res.render(p)    
});

router.get("/note/add", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "noteadd");
    res.render(p, { mode: "add" , id: null} )    
});

router.get("/note/edit/:id", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "noteadd");
    res.render(p, { mode: "edit", id: req.params.id} )    
});


router.get("/categories", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "categorylist");
    res.render(p)    
});

router.get("/category/add", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "categoryadd");
    res.render(p, { mode: "add" , id: null} )    
});

router.get("/category/edit/:id", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "categoryadd");
    res.render(p, { mode: "edit", id: req.params.id} )    
});


router.get("/projects", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "projectlist");
    res.render(p)    
});

router.get("/project/add", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "projectadd");
    res.render(p, { mode: "add" , id: null} )    
});

router.get("/project/edit/:id", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "projectadd");
    res.render(p, { mode: "edit", id: req.params.id} )    
});


module.exports = router;