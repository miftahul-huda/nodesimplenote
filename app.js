require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const session = require('express-session');
var Initialization = require("./initialization")
var cors = require('cors')



const port = process.env.APPLICATION_PORT;

var ejs = require('ejs'); 
ejs.open = '{{'; 
ejs.close = '}}';


var app = express();
const {Datastore} = require('@google-cloud/datastore');
const {DatastoreStore} = require('@google-cloud/connect-datastore');


//Consider all request as application/json
app.use(express.json({type: '*/*', limit: '100mb'}));
// parse application/json
app.use(bodyParser.json())
app.use(cors())


// set the view engine to ejs

app.set("view options", {layout: false});  
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');
app.set('views', __dirname + "/public/pages");



app.use(session({
  store: new DatastoreStore({
    dataset: new Datastore(),
    kind: 'express-sessions',
  }),
  secret: 'nodesimplenote',saveUninitialized: true,resave: false}));


//Dynamic routing based on configuration
const fs = require('fs');
let rawdata = fs.readFileSync('route-config.json');
let routers = JSON.parse(rawdata);
routers.forEach(function (route){
  var r = require(route.router);
  app.use(route.path,  r)
})


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
*/




Initialization.initializeDatabase();

app.listen(port)

console.log("\n\n==================================================\nApplication     : Node Simple Note\nPort\t\t: " + port + "\n==================================================\n\n\n")
console.log("RUNNING.....\n\n")

module.exports = app;
