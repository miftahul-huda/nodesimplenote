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

router.get('/callback', function(req, res, next) {
  var session = req.session;
  res.send("OK");
});


module.exports = router;
