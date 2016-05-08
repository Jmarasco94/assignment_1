var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose');
var Births = mongoose.model('Births');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()){
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){
    
	/* GET index page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* GET login page. */
	router.get('/index', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});


	/* Handle Login POST */
	router.post('/index', passport.authenticate('index', {
		successRedirect: '/profile',
		failureRedirect: '/index',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/register', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/register', passport.authenticate('register', {
		successRedirect: '/profile',
		failureRedirect: '/register',
		failureFlash : true  
	}));

	/* GET Profile Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	

//facebook
router.get('/login/facebook',
passport.authenticate('facebook', {scope: 'email'}
));
//facebook callback
router.get('/login/faebook/callback',
passport.authenticate('facebook', {
	successRedirect: 'profile',
	failureRedirect: '/'
})
);

//linkedin
router.get('/login/linkedin',
passport.authenticate('linkedin'));

 //linkekin handle
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
