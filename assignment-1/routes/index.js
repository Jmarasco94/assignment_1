var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose');

var Births = mongoose.model('Births');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Births', function(req, res, next) {
    Births.find(function(err, births){
        if(err){ return next(err); }
         res.json(births);
    }
    );
});
module.exports = router;
