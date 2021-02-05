var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  if(session.email != null)
    res.redirect('/web/notes')
  else
    res.redirect('/web/signin')
});

module.exports = router;
