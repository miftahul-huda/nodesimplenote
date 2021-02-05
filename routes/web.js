var express = require('express');
var router = express.Router();
const path = require('path');

router.get("/notes", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "notelist");
        res.render(p)    
    }
});

router.get("/note/add", function(req, res){
    var appSession = req.session;
    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "noteadd");
        res.render(p, { mode: "add" , id: null} )    
    }
});

router.get("/note/edit/:id", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "noteadd");
        res.render(p, { mode: "edit", id: req.params.id} )   
    } 
});


router.get("/categories", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "categorylist");
        res.render(p)    
    }
});

router.get("/category/add", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "categoryadd");
        res.render(p, { mode: "add" , id: null} )    
    }
});

router.get("/category/edit/:id", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "categoryadd");
        res.render(p, { mode: "edit", id: req.params.id} )   
    } 
});


router.get("/projects", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "projectlist");
        res.render(p)    
    }
});

router.get("/project/add", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "projectadd");
        res.render(p, { mode: "add" , id: null} )    
    }
});

router.get("/project/edit/:id", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "projectadd");
        res.render(p, { mode: "edit", id: req.params.id} )  
    }  
});


router.get("/signin", function(req, res){
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "signin");
    res.render(p, { session: appSession } )   
});


router.get("/signout", function(req, res){
    var appSession = req.session;
    appSession.email = null;
    appSession.name = null;
    
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "signout");
    res.render(p, { session: appSession } )    
});

router.get("/loggedin", function(req, res){
    var appSession = req.session;
    var id = req.query.id;
    var email = req.query.email;
    var name = req.query.name;
    var image = req.query.photo;

    appSession.id = id;
    appSession.email = email;
    appSession.name = name;
    appSession.image = image;

    res.redirect('/')  
});

module.exports = router;