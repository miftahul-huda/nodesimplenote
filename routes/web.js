var express = require('express');
var router = express.Router();
const path = require('path');

router.get("/notes", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        return res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "notelist");
        return res.render(p, { session: appSession })    
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
        res.render(p, { mode: "add" , id: null, session: appSession} )    
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
        res.render(p, { mode: "edit", id: req.params.id, session: appSession} )   
    } 
});

router.get("/note/view/:id", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "noteadd");
        res.render(p, { mode: "view", id: req.params.id, session: appSession} )   
    } 
});

router.get("/note/share/:id", function(req, res){
    var appSession = req.session;
    
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "noteshare");
    res.render(p, { mode: "view", id: req.params.id, session: appSession} )   

});


router.get("/categories", function(req, res){
    var appSession = req.session;

    if(appSession == null || appSession.email == null)
        res.redirect('/')
    else
    {
        var dir = __dirname;
        var p = path.resolve( dir, "../public/pages/", "categorylist");
        res.render(p , { session: appSession })    
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
        res.render(p, { mode: "add" , id: null, session: appSession } )    
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
        res.render(p, { mode: "edit", id: req.params.id, session: appSession} )   
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
        res.render(p, { session: appSession })    
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
        res.render(p, { mode: "add" , id: null, session: appSession} )    
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
        res.render(p, { mode: "edit", id: req.params.id, session: appSession} )  
    }  
});



router.get("/signin", function(req, res){

    console.log("/signin")
    var appSession = req.session;
    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "signin");
    return res.render(p, { session: appSession } )   
    //res.send("Test")
    
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

    console.log("/loggedin")

    res.redirect('/')  
});

module.exports = router;