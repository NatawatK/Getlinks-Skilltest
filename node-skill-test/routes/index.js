var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('form');

});

router.get('/form', function(req, res, next){
  // res.sendFile('../views/form.html');
  res.render('form');
});
module.exports = router;
