var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose');
var Births = mongoose.model('Births');

var isAuthenticated = function (req, res, next) {

	if (req.isAuthenticated()){
		return next();
	}
	
	res.redirect('/');
}

module.exports = function(passport){
    

	router.get('/', function(req, res) {
    
		res.render('index', { message: req.flash('message') });
	});


	router.get('/index', function(req, res) {
    	
		res.render('index', { message: req.flash('message') });
	});



	router.post('/index', passport.authenticate('index', {
		successRedirect: '/profile',
		failureRedirect: '/index',
		failureFlash : true  
	}));


	router.get('/register', function(req, res){
		res.render('register',{message: req.flash('message')});
	});


	router.post('/register', passport.authenticate('register', {
		successRedirect: '/profile',
		failureRedirect: '/register',
		failureFlash : true  
	}));

	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});


	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	


router.get('/login/facebook',
passport.authenticate('facebook', {scope: 'email'}
));

router.get('/login/faebook/callback',
passport.authenticate('facebook', {
	successRedirect: 'profile',
	failureRedirect: '/'
})
);


router.get('/login/linkedin',
passport.authenticate('linkedin'));

 
 router.get('/login/linkedin/callback',
 passport.authenticate('linkedin', {
 	successRedirect: '/profile',
 	failureRedirect: '/'
 })
 );

	router.get('/data', isAuthenticated, function(req, res, next) {
	  Births.find({}, {_id: 0}, function(err, data){
	  if(err){ return next(err); }
	  	res.json(data);
	  });
	});

	return router;
}