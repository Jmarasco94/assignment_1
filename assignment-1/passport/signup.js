var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require ('bcrypt-nodejs');

module.exports=function(passport){
    passport.use('signup', new LocalStrategy ({
        username: 'email',
        passwordField: 'password',
        passReqToCalback : true
    },
    function (req, email, password, done) {
        if (email)
        email=email.toLowerCase(); 
            
        
        var findOrCreateUser = function() {
            User.findOne({'email': email}, function(err, user) {
                if (err){
                    console.log('Error in SignUp' +err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists with email: ' +email)
                    return done (null, false, req.flash('message', 'User Already Exists'));
                } else {
                    var newUser = new User();
                    
                    newUser.email = req.param('email');
                    newUser.local.password = createHash(password);
                    
                    newUser.save(function(err) {
                        if(err){
                            console.log('Error in Saving user:' +err);
                            throw err;
                        }
                        console.log('User Registration sucessful');
                        return done(null, newUser);
                    });
                }
            });
        };
                
process.nextTick(findOrCreateUser);
})
);
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
}