console.log("Start db init")
require('dotenv').config()
console.log(process.env.DBHOST)
var Initialization = require("./initialization")
Initialization.initializeDatabase();